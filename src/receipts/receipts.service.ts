import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IReceipt } from './receipts.interface';
import { IKeycloakUser } from '@slickteam/nestjs-keycloak';
import { Receipt } from 'src/entities/receipt.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IError } from 'src/common.interface';
import {randomUUID } from 'crypto';
import { ReceiptLine } from 'src/entities/receipt-line.entity';
import { User } from 'src/entities/user.entity';
import { extname, join } from 'path';
import { readdir, readFile, rename } from 'fs/promises';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';

@Injectable()
export class ReceiptsService {

  constructor (
    @InjectRepository(Receipt)
    private readonly receipt : Repository<Receipt>,
    private readonly users : UsersService
  ){}

  async getTemplate(): Promise<IReceipt>{
    return {
        receipt_id: "R1234",
        project_id: "1234",
        description: "test",
        lines: [],
        user_id: "12345",
        category: {
            category_id : "C1234",
            description: "TEST",
            name: "TEST1",
            type: "CAT_TYPE"
        },
        total: "999.99",
        entry_date: new Date(),
        user: {
            user_id: "U1234",
            username: "name",
            type: 1
        }
    }
  }

  async insertImage(image: Express.Multer.File, usr:IKeycloakUser) : Promise<any> {
    if (!image) {
          const err: IError = {
            message: "Missing image",
            service: "receipt.insert",
            status_code: 400,
            params: ["image"]
          };
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }

    const uid = randomUUID();
    const ext = extname(image.originalname);
    const finalPath = join('uploads', `${uid}${ext}`);
    await rename(image.path, finalPath);
    image.path = finalPath;

    const fileBuffer = await readFile(finalPath);
    const b64Str = fileBuffer.toString("base64");
    
    const bod = {
    model: "receipt-scan",
    stream: false,
    messages: [
      {
        role: "user",
        content: "",
        images: [b64Str]
      }
    ]
  };

  const propositionResp = await fetch("http://192.168.2.136:11434/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bod)
  });

  const data = await propositionResp.json();

    

    return {
      file_id: uid,
      file_proposition: JSON.parse(data.message.content)
    };


  }


  async getImage(usr: IKeycloakUser, id: any, response: Response) {
    const files = await readdir("./uploads", {withFileTypes : true});

    const file = files.find((f) => f.isFile() && f.name.split('.')[0] === id);

    if(!file){
      const err: IError = {
        message: "File not found. upload the file first",
        service: "receipt.getImage",
        status_code: 404,
        params: ["id"]
      }

      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }

    response.sendFile(join(process.cwd(), "uploads", file.name));

  }

  async insertReceipt( body: IReceipt, usr: IKeycloakUser) : Promise<Receipt>{
      if(!body.total || !body.category || !body.description || !body.project_id || !body.file_id){
        const err: IError = {
          message: "Missing total, category, description or file_id",
          service: "receipt.insert",
          status_code: 400,
          params: ["total", "category", "description", "file_id"]
        };

        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }

      const files = await readdir("./uploads", {withFileTypes : true});

      const file = files.find((f) => f.isFile() && f.name.split('.')[0] === body.file_id);

      if(!file){
        const err: IError = {
          message: "File not found. upload the file first",
          service: "receipt.insert",
          status_code: 400,
          params: ["file_id"]
        }

        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }

      const user = await this.users.updateProfile(usr);


      const rc : Receipt = {
        receipt_id : randomUUID(),
        description: body.description.length > 49 ? body.description.substring(0, 49) : body.description,
        entry_date: new Date(),
        total: body.total,
        user: user,

        category: {
          categorie_id: body.category.category_id,
        },

        project: {
          project_id: body.project_id
        },
      };

      rc.lines = [];
      body.lines.forEach((i) =>{
        const line : ReceiptLine = {
          line_id: randomUUID(),
          input: i.name,
          qte: i.qty,
          subtotal: i.price,
        }
        rc.lines?.push(line);
      });


      const rcp = await this.receipt.save(rc).then((r) => {
        const finalPath = join('uploads', `${r.receipt_id}.${file.name.split('.')[1]}`);
        rename(join('uploads', file.name), finalPath);
        return r;
      });

      return rcp;


  }


  async fetchAll(usr: IKeycloakUser): Promise<Receipt[]>{
    let rows = await this.receipt.find({
    where: {
      user: { user_id: usr.sub }
    },
    relations: { category: true, lines: true, project: true }
  });

    if(rows.length < 1){
      const err : IError = {
        message: "No Receipt found",
        status_code: 404,
        service: "receipt.fetchAll"
      }

      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }

    return rows;
  }

  async fetchByID(usr: IKeycloakUser, param: any) : Promise<Receipt> {
    let row = await this.receipt.findOne({
      where: {
        user : {user_id: usr.sub},
        receipt_id: param
      },
      relations: {category: true, lines: true, project: true}
    });

    if(row == null){
      const err : IError = {
        message: "No Receipt found",
        status_code: 404,
        service: "receipt.fetch"
      }

      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }

    return row;
  }

  async fetchByProject(usr:IKeycloakUser, project_id:string) : Promise<Receipt[]> {
    let rows = await this.receipt
    .createQueryBuilder('receipt')
    .leftJoinAndSelect('receipt.project', 'project')
    .leftJoinAndSelect('receipt.category', 'category')
    .leftJoinAndSelect('receipt.lines', 'lines')
    .leftJoin('receipt.user', 'user')
    .where('project.project_id = :project_id', { project_id })
  .andWhere('user.user_id = :user_id', { user_id: usr.sub })
    .orderBy('receipt.entry_date', 'DESC')
    .getMany();

    if(rows.length < 1){
      const err : IError = {
        message: "No Receipt found",
        status_code: 404,
        service: "receipt.fetchByProject"
      }

      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }

    return rows;
  }
}

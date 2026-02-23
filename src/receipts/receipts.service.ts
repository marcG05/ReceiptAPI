import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IReceipt } from './receipts.interface';
import { IKeycloakUser } from '@slickteam/nestjs-keycloak';
import { Receipt } from 'src/entities/receipt.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IError } from 'src/common.interface';

@Injectable()
export class ReceiptsService {

  constructor (
    @InjectRepository(Receipt)
    private readonly receipt : Repository<Receipt>

  ){}

  async getTemplate(): Promise<IReceipt>{
    return {
        receipt_id: "R1234",
        category: {
            category_id : "C1234",
            description: "TEST",
            name: "TEST1",
            type: "CAT_TYPE"
        },
        total: "999.99",
        entry_date: new Date(),
        lines: [],
        user: {
            user_id: "U1234",
            username: "name",
            type: 1
        }
    }
  }


  async fetchAll(usr: IKeycloakUser): Promise<Receipt[]>{
    let rows = await this.receipt.find();

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

  async fetchByProject(usr:IKeycloakUser, project_id:string) : Promise<Receipt[]> {
    let rows = await this.receipt
    .createQueryBuilder('receipt')
    .leftJoinAndSelect('receipt.project', 'project')
    .leftJoinAndSelect('receipt.category', 'category')
    .leftJoinAndSelect('receipt.lines', 'lines')
    .leftJoin('receipt.user', 'user')
    .where('project.project_id = :project_id', { project_id })
    //.andWhere('user.user_id = :user_id', { user_id: usr.sub })
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

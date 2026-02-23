import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ICategory } from './receipts.interface';
import { Category } from 'src/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAction, IError } from 'src/common.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class CategoriesService {

    constructor (
        @InjectRepository(Category)
        private cat: Repository<Category>
    ){}


    async fetchAll(): Promise<Category[]>{
        let rows = await this.cat.find();
        if(rows.length < 1) {
            const err : IError = {
                message: "No categories found",
                service: "category.fetchAll",
                status_code: 404
            };

            throw new HttpException(err, HttpStatus.NOT_FOUND);
        }

        return rows;
    }

    async add(input:ICategory) : Promise<IAction>{
        if(!input.description || !input.name || !input.type){
            const err : IError = {
                message: "Missing one parameter",
                service: "category.add",
                status_code: 400,
                params: ["description", "name", "type"]
            };

            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }

        const cat : Category = {
            categorie_id: randomUUID(),
            description: input.description,
            name: input.name,
            type: input.type
        };

        await this.cat.insert(cat);

        const act : IAction = {
            confirmed: true,
            message: "Category added",
            status_code: 200
        };

        return act;

    }
}
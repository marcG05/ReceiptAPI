import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ICategory } from './receipts.interface';
import { Category } from 'src/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IError } from 'src/common.interface';

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
}
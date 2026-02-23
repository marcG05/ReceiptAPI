import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { CategoriesService } from './categories.service';
import { type ICategory } from './receipts.interface';

@Controller("receipts")
export class ReceiptsController {
  constructor(private readonly rService: ReceiptsService,
              private readonly cService: CategoriesService
  ) {}

  @Get("template/")
  async getTemplate() : Promise<any> {
    return this.rService.getTemplate();
  }

  @Get("categories/")
  async getCategories(): Promise<any> {
    return this.cService.fetchAll();
  }

  @Put("categories/")
  async addCategories(@Body() body: ICategory): Promise<any> {
    return this.cService.add(body);
  }

  @Get("categories/search")
  async searchCat(@Query("s") query:string){
    return this.cService.find(query);
  }

}

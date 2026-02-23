import { Controller, Get } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { CategoriesService } from './categories.service';

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
}

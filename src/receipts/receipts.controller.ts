import { Controller, Get } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';

@Controller("receipts")
export class ReceiptsController {
  constructor(private readonly rService: ReceiptsService) {}

  @Get("template/")
  async getTemplate() : Promise<any> {
    return this.rService.getTemplate();
  }
}

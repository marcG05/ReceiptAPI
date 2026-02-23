import { Injectable } from '@nestjs/common';
import { IReceipt } from './receipts.interface';

@Injectable()
export class ReceiptsService {

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
}

import { Module, UseInterceptors } from "@nestjs/common";
import { ReceiptsController } from "./receipts.controller";
import { ReceiptsService } from "./receipts.service";
import { CategoriesService } from "./categories.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";
import { Receipt } from "src/entities/receipt.entity";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [TypeOrmModule.forFeature([Category, Receipt]), UsersModule],
    controllers: [ReceiptsController],
    providers: [ReceiptsService, CategoriesService],
    exports: [ReceiptsService]
})
export class ReceiptsModule{};
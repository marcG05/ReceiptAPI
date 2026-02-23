import { Module } from "@nestjs/common";
import { ReceiptsController } from "./receipts.controller";
import { ReceiptsService } from "./receipts.service";
import { CategoriesService } from "./categories.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [ReceiptsController],
    providers: [ReceiptsService, CategoriesService],
    exports: [ReceiptsService]
})
export class ReceiptsModule{};
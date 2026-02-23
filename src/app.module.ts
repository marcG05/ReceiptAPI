import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Category } from './entities/category.entity';
import { User } from './entities/user.entity';
import { Receipt } from './entities/receipt.entity';
import { ReceiptLine } from './entities/receipt-line.entity';
import { ProjectUser } from './entities/project-user.entity';
import { ReceiptsModule } from './receipts/receipts.module';
import { ProjectsModule } from './projects/projects.module';
import {ConfigModule} from '@nestjs/config'
import { KeycloakModule } from '@slickteam/nestjs-keycloak';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type : "postgres",
      host : process.env.DB_HOST,
      database : process.env.DB_NAME,
      username : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD,
      port : 5432,
      entities: [Project, Category, User, Receipt, ReceiptLine, ProjectUser],
    }),
    KeycloakModule,
    ReceiptsModule, ProjectsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

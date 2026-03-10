import { Module } from "@nestjs/common";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "src/entities/project.entity";
import { ProjectUser } from "src/entities/project-user.entity";
import { UsersModule } from "src/users/users.module";


@Module({
    imports: [TypeOrmModule.forFeature([Project, ProjectUser]), UsersModule],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService]
})
export class ProjectsModule{};
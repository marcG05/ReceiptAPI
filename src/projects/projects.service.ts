import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IProject } from './projects.interface';
import { IKeycloakUser } from '@slickteam/nestjs-keycloak';
import { IAction, IError } from 'src/common.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';


@Injectable()
export class ProjectsService {

    constructor (
        @InjectRepository(Project)
        private proj: Repository<Project>
    ){};

    getTemplate(): IProject {
        return {
            description: "TEST",
            start_date: new Date(),
            project_id: "P1234",
            status: 1,
            project_name: "NAME",
        }
    }

    async fetchAll(usr: IKeycloakUser): Promise<IProject[]> {
        let rows = await this.proj.find();

            if(rows.length < 1){
                const err: IError = {
                message: "No projects found",
                service: "project.fetchAll",
                status_code: 404,
            };

            throw new HttpException(err, HttpStatus.NOT_FOUND);
        }

        return rows;
        
    }

    async newProject(usr:IKeycloakUser, in_proj:IProject): Promise<IAction> {
        if(!in_proj.description || !in_proj.project_name){
            const err : IError = {
                message: "Missing params for the project",
                service: "project.new",
                status_code: 400,
                params: ["description", "project_name"]
            };

            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }

        let parentProjectEntity: Project | null = null;

        if (in_proj.project_id) {
            parentProjectEntity = await this.proj.findOne({ where: { project_id: in_proj.project_id } });
        }

        const pro: Project = {
            project_id: randomUUID(),
            description: in_proj.description,
            project_name: in_proj.project_name,
            status: 1,
            start_date: new Date(),
            parentProject: parentProjectEntity || null  // must be null if no parent
        };

        await this.proj.insert(pro);


        const act: IAction = {
            message: "Project successfully created",
            confirmed: true,
            arguments: [{
                project_id : 123
            }],
            status_code: 200
        };

        return act;
    }
}
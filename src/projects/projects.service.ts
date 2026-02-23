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

    async fetch(usr:IKeycloakUser, id:string) : Promise<IProject> {
        let row = await this.proj.findOneBy({project_id: id});
        if(!row){
            const err : IError = {
                message: "No project found",
                service: "project.fetch",
                status_code: 404,
                params: ["ID"]
            };

            throw new HttpException(err, HttpStatus.NOT_FOUND);
        }

        return row;
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

        let uid = randomUUID();

        let parentProjectEntity: Project | null = null;

        if (in_proj.project_id) {
            parentProjectEntity = await this.proj.findOne({ where: { project_id: in_proj.project_id } });
        }

        const pro: Project = {
            project_id: uid,
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
                project_id : uid
            }],
            status_code: 200
        };

        return act;
    }
}
import { Injectable } from '@nestjs/common';
import { IProject } from './projects.interface';

@Injectable()
export class ProjectsService {

    async getTemplate(): Promise<IProject> {
        return {
            description: "TEST",
            start_date: new Date(),
            project_id: "P1234",
            status: 1,
            project_name: "NAME",
        }
    }
}
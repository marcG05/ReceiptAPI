
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { type IKeycloakUser, KeycloakUser } from '@slickteam/nestjs-keycloak';
import { type IProject } from './projects.interface';

@Controller("projects")
export class ProjectsController {
  constructor(private readonly proService: ProjectsService) {}


  @Get("template/")
  getTemplate(): IProject {
    return this.proService.getTemplate();
  }

  @Get()
  async fetchAll(@KeycloakUser() usr: IKeycloakUser): Promise<any> {
    return this.proService.fetchAll(usr);
  }

  @Get(":id")
  async fetch(@Param() param: any): Promise<any> {
    let t = this.proService.getTemplate();
    (await t).project_id = param.id;
    return t;
  }


  @Post(":id")
  async edit(@Param() param:any): Promise<any>{
    return this.proService.getTemplate();
  }

  @Put()
  async add(@KeycloakUser() usr: IKeycloakUser, @Body() body: IProject): Promise<any> {
    return this.proService.newProject(usr, body);
  }

}
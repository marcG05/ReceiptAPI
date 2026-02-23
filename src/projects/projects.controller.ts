
import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller("projects")
export class ProjectsController {
  constructor(private readonly proService: ProjectsService) {}


  @Get("template/")
  async getTemplate(): Promise<any> {
    return this.proService.getTemplate();
  }

  @Get()
  async fetchAll(): Promise<any> {
    return this.proService.getTemplate();
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
  async add(): Promise<any> {
    return this.proService.getTemplate();
  }

}
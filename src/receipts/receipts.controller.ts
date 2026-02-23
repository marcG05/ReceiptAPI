import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { CategoriesService } from './categories.service';
import { type ICategory } from './receipts.interface';
import { type IKeycloakUser, KeycloakUser } from '@slickteam/nestjs-keycloak';

@Controller("receipts")
export class ReceiptsController {
  constructor(private readonly rService: ReceiptsService,
              private readonly cService: CategoriesService
  ) {}

  @Get("template/")
  async getTemplate() : Promise<any> {
    return this.rService.getTemplate();
  }

  @Get("categories/")
  async getCategories(): Promise<any> {
    return this.cService.fetchAll();
  }

  @Put("categories/")
  async addCategories(@Body() body: ICategory): Promise<any> {
    return this.cService.add(body);
  }

  @Get("categories/search")
  async searchCat(@Query("s") query:string){
    return this.cService.find(query);
  }

  @Get()
  async fetchAll(@KeycloakUser() usr: IKeycloakUser){
    return this.rService.fetchAll(usr);
  }

  @Get("search/")
  async findByProject(@KeycloakUser() usr: IKeycloakUser, @Query('s')s: string){
    return this.rService.fetchByProject(usr, s);
  }

}

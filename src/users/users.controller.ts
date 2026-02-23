import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { type IKeycloakUser, KeycloakUser } from '@slickteam/nestjs-keycloak';

@Controller("users")
export class UsersController {
  constructor(private  readonly usrService: UsersService) {}

  @Get()
  async getProfile(@KeycloakUser() usr: IKeycloakUser) : Promise<any> {
    return this.usrService.getProfile(usr);
  }
}

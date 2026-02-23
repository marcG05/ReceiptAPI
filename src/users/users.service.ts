import { Injectable } from '@nestjs/common';
import { IKeycloakUser } from '@slickteam/nestjs-keycloak';

@Injectable()
export class UsersService {

  async getProfile(usr:IKeycloakUser): Promise<IKeycloakUser>{
    return usr;
  }
}

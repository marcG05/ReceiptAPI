import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IKeycloakUser } from '@slickteam/nestjs-keycloak';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
        private readonly user : Repository<User>
  ){}
  async getProfile(usr:IKeycloakUser): Promise<IKeycloakUser>{
    return usr;
  }

  async updateProfile(usr:IKeycloakUser) : Promise<User>{
    const usrDb : User = {
            user_id : usr.sub,
            type : 1,
            username: usr.name
    };

    return await this.user.save(usrDb);

    
  }
}

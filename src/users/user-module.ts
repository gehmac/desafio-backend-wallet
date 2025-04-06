import { UsersController } from "./controller/user-controller";
import { Module } from "@nestjs/common";
import { UserService } from "./service/user-service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user-entity";
import { UserRepository } from "./repositories/user-repository";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository]
})
export class UsersModule { }
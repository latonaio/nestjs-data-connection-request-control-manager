import { Body, Controller, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import {
  RegisterUserPost,
  UpdateUserPost,
  LoginUserPost,
} from './dtos';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(
    @Body() { loginId, password, businessPartner }: RegisterUserPost,
  ): Promise<Object> {
    return this.userService.registerUser(loginId, password, businessPartner);
  }

  @Put('update')
  async update(
    @Body() { loginId, oldPassword, password, businessPartner }: UpdateUserPost,
  ): Promise<Object> {
    return this.userService.updateUser(loginId, oldPassword, password, businessPartner);
  }

  @Post('login')
  async login(
    @Body() { loginId, password, businessPartner }: LoginUserPost,
  ): Promise<Object> {
    return this.userService.loginUser(loginId, password, businessPartner);
  }
}

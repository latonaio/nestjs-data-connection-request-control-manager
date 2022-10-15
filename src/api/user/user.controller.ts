import { Body, Controller, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(
    @Body('login_id') loginId: string,
    @Body('password') password: string
  ): Promise<Object> {
    return this.userService.registerUser(loginId, password);
  }

  @Put('update')
  async update(
    @Body('login_id') loginId: string,
    @Body('old_password') oldPassword: string,
    @Body('password') password: string
  ): Promise<Object> {
    return this.userService.updateUser(loginId, oldPassword, password);
  }

  @Post('login')
  async login(
    @Body('login_id') loginId: string,
    @Body('password') password: string
  ): Promise<Object> {
    return this.userService.loginUser(loginId, password);
  }
}

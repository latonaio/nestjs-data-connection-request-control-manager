import { Body, Controller, Post } from '@nestjs/common';
import { AuthPost } from './dtos';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('auth')
  async auth(
    @Body() { emailAddress, password }: AuthPost,
  ): Promise<Object> {
    return this.authService.auth(emailAddress, password);
  }
}

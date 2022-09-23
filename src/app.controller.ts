import { PrismaService } from './prisma/prisma.service';
import { Body, Controller, Get, Post, Put, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('user/register')
  async register(
    @Body('login_id') loginId: string,
    @Body('password') password: string
  ): Promise<Object> {
    return this.appService.registerUser(loginId, password);
  }

  @Put('user/update')
  async update(
    @Body('login_id') loginId: string,
    @Body('old_password') oldPassword: string,
    @Body('password') password: string
  ): Promise<Object> {
    return this.appService.updateUser(loginId, oldPassword, password);
  }

  @Post('user/login')
  async login(
    @Body('login_id') loginId: string,
    @Body('password') password: string
  ): Promise<Object> {
    return this.appService.loginUser(loginId, password);
  }

  @Get('odata/:api_service_name/:api_type')
  async odata(
    @Body('api_service_name') aPIServiceName: string,
    @Body('api_type') aPIType: string,
    @Request() req,
  ): Promise<Object> {
    const jwtToken = req.headers.authorization.replace('Bearer ', '');
    return await this.appService.odata(aPIServiceName, aPIType, jwtToken);
  }

  @Get('test')
  async test(
  ): Promise<Object> {
    return this.appService.test();
  }
}

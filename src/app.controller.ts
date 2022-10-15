import { Controller, Get, InternalServerErrorException } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('test')
  async test(
  ): Promise<Object> {
    throw new InternalServerErrorException({ message: 'error111' });
    // return this.appService.test();
  }
}

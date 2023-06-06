import { Body, Controller, Post, Put } from '@nestjs/common';
import { BusinessUserService } from './business-user.service';
import {
  RegisterUserPost,
  UpdateUserPost,
} from './dtos';

@Controller()
export class BusinessUserController {
  constructor(
    private readonly userService: BusinessUserService,
  ) {}

  @Post('creates')
  async register(
    @Body() {
      emailAddress,
      password,
      businessPartner,
      businessPartnerName,
      businessUserFirstName,
      businessUserLastName,
      businessUserFullName,
      language,
    }: RegisterUserPost,
  ): Promise<Object> {
    return this.userService.registerUser(
      emailAddress,
      password,
      businessPartner,
      businessPartnerName,
      businessUserFirstName,
      businessUserLastName,
      businessUserFullName,
      language,
    );
  }

  @Put('updates')
  async update(
    @Body() { emailAddress, oldPassword, password, businessPartner }: UpdateUserPost,
  ): Promise<Object> {
    return this.userService.updateUser(emailAddress, oldPassword, password, businessPartner);
  }
}

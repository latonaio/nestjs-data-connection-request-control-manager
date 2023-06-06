import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BusinessUserService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(
    emailAddress: string,
    password: string,
    businessPartner: number,
    businessPartnerName: string,
    businessUserFirstName: string,
    businessUserLastName: string,
    businessUserFullName: string,
    language: string,
  ): Promise<Object> {
    const { url } = this.configService.get('authenticator');
    await firstValueFrom(this.httpService.post(
      `${url}/users`,
      {
        email_address: emailAddress,
        password,
        business_partner: businessPartner,
        business_partner_name: businessPartnerName,
        business_user_first_name: businessUserFirstName,
        business_user_last_name: businessUserLastName,
        business_user_full_name: businessUserFullName,
        language,
      }
    ));

    return {
      emailAddress,
      businessPartner,
      businessPartnerName,
      businessUserFirstName,
      businessUserLastName,
      businessUserFullName,
      language,
    };
  }

  async updateUser(emailAddress: string, oldPassword: string, password: string, businessPartner: number): Promise<Object> {
    const { url } = this.configService.get('authenticator');
    await firstValueFrom(this.httpService.put(
      `${url}/users/login_id/${emailAddress}`,
      {
        email_address: emailAddress,
        old_password: oldPassword,
        password: password,
        business_partner: businessPartner
        // qos: "raw",
      }
    ));

    return { emailAddress, oldPassword, password };
  }
}

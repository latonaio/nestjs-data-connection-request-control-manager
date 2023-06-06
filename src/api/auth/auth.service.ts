import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async auth(emailAddress: string, password: string): Promise<Object> {
    const { url } = this.configService.get('authenticator');

    const results = await Promise.all([
      (async () => {
        return await firstValueFrom(this.httpService.post(
          `${url}/login`,
          {
            email_address: emailAddress,
            password,
          }
        ));
      })(),
      (async () => {
        return await firstValueFrom(this.httpService.get(
          `${url}/users/login_id/${emailAddress}`,
        ));
      })(),
    ]);

    return {
      accessToken: results[0].data.jwt,
      user: {
        emailAddress: results[1].data.email_address,
        businessPartner: results[1].data.business_partner,
        businessPartnerName: results[1].data.business_partner_name,
        businessUserFirstName: results[1].data.business_user_first_name,
        businessUserLastName: results[1].data.business_user_last_name,
        businessUserFullName: results[1].data.business_user_full_name,
        language: results[1].data.language,
      },
    }
  }
}

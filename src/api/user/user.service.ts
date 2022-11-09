import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(loginId: string, password: string, businessPartner: number): Promise<Object> {
    const { url } = this.configService.get('authenticator');
    await firstValueFrom(this.httpService.post(
      `${url}/users`,
      {
        login_id: loginId,
        password,
        business_partner: businessPartner,
      }
    ));

    return { message: 'Created user successfully', data: { loginId } };
  }

  async updateUser(loginId: string, oldPassword: string, password: string, businessPartner: number): Promise<Object> {
    const { url } = this.configService.get('authenticator');
    await firstValueFrom(this.httpService.put(
      `${url}/users/login_id/${loginId}`,
      {
        login_id: loginId,
        old_password: oldPassword,
        password: password,
        business_partner: businessPartner
        // qos: "raw",
      }
    ));

    return { message: 'Updated user successfully', data: { loginId, oldPassword, password } };
  }

  async loginUser(loginId: string, password: string, businessPartner: number): Promise<Object> {
    const { url } = this.configService.get('authenticator');

    const result: any = await firstValueFrom(this.httpService.post(
      `${url}/login`,
      {
        login_id: loginId,
        password,
        business_partner: businessPartner,
      }
    ));

    return { message: 'Login is success', data: { jwt: result.data.jwt } };
  }
}

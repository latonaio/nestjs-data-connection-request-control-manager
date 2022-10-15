import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
  ) {
  }

  async registerUser(loginId: string, password: string): Promise<Object> {
    const url = `http://${process.env.AUTHENTICATOR_HOST}:${process.env.AUTHENTICATOR_PORT}/users`;

    await firstValueFrom(this.httpService.post(
      url,
      {
        login_id: loginId,
        password: password,
      }
    ));

    return {
      statusCode: 200,
      message: 'Created user successfully',
      data: {
        loginId,
      }
    }
  }

  async updateUser(loginId: string, oldPassword: string, password: string): Promise<Object> {
    const url = `http://${process.env.AUTHENTICATOR_HOST}:${process.env.AUTHENTICATOR_PORT}/users/login_id/${loginId}`;
    await firstValueFrom(this.httpService.put(
      url,
      {
        login_id: loginId,
        old_password: oldPassword,
        password: password,
        // qos: "raw",
      }
    ));

    return {
      statusCode: 200,
      message: 'Updated user successfully',
      data: {
        loginId,
        oldPassword,
        password
      }
    };
  }

  async loginUser(loginId: string, password: string): Promise<Object> {
    const url = `http://${process.env.AUTHENTICATOR_HOST}:${process.env.AUTHENTICATOR_PORT}/login`;
    const result: any = await firstValueFrom(this.httpService.post(
      url,
      {
        login_id: loginId,
        password: password
      }
    ));

    return {
      statusCode: 200,
      message: 'Login is success',
      data: {
        jwt: result.data.jwt
      }
    };
  }
}

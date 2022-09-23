import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
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
      result: 'success create user'
    };
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
      loginId,
      oldPassword,
      password,
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
      jwt: result.data.jwt
    };
  }

  async test(): Promise<Object> {
    console.log(process.env.AUTHENTICATOR_HOST)

    return {
      test: 'success'
    }
  }

  private async verifyToken(jwtToken: string): Promise<{ loginId: String}> {
    const url = `http://${process.env.AUTHENTICATOR_HOST}:${process.env.AUTHENTICATOR_PORT}/token/verify`;
    const result: any = await firstValueFrom(this.httpService.post(
      url,
      {},
      {headers: { 'Authorization': `Bearer ${jwtToken}` }},
    ));

    console.log(result.request.res.statusCode);
    console.log(result.data);

    return {
      loginId: 'etsts'
    }
  }

  async odata(
    aPIServiceName: string,
    aPIType: string,
    jwtToken: string,
  ): Promise<Object> {
    await this.verifyToken(jwtToken);

    return {
      result: 'success'
    }
  }
}

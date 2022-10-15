import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async test(): Promise<Object> {
    // console.log(uuid.v4());
    console.log(process.env.AUTHENTICATOR_HOST)

    return {
      test: 'success'
    }
  }
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestBody: (...dataOrPipes: any[]) => ParameterDecorator = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.body;
  }
);

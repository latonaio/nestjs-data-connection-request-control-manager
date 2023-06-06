import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RuntimeSessionId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.headers['runtime-session-id'];
  }
)

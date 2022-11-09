import { HttpStatus } from '@nestjs/common';

export class JwtAuthenticationException extends Error {
  public readonly statusCode = HttpStatus.UNAUTHORIZED;
  public readonly name = 'jwt authentication exception';

  constructor(
    public readonly message: string,
    public readonly data?: Object,
  ) {
    super(message);
  }
}

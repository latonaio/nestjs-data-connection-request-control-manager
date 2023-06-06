import { HttpStatus } from '@nestjs/common';

export class ApiModuleRuntimeException extends Error {
  public readonly statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

  constructor(
    public readonly name: string = 'api module runtime exception',
    public readonly message: string,
    public readonly data?: Object,
  ) {
    super(message);
  }
}

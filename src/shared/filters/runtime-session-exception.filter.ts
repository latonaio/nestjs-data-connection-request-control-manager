import { HttpStatus } from '@nestjs/common';

export class RuntimeSessionException extends Error {
  public readonly statusCode = HttpStatus.REQUEST_TIMEOUT;
  public readonly name = 'runtime session exception';

  constructor(
    public readonly message: string,
    public readonly data?: Object,
  ) {
    super(message);
  }
}

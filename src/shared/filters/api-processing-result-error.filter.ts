import { HttpStatus } from '@nestjs/common';

export class ApiProcessingResultException extends Error {
  public readonly statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

  constructor(
    public readonly data?: Object,
  ) {
    super();
  }
}

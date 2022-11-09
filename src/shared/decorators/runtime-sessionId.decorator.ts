import { createParamDecorator } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export const RuntimeSessionId: (...dataOrPipes: any[]) => ParameterDecorator = createParamDecorator(
  () => {
    return uuidv4();
  },
);

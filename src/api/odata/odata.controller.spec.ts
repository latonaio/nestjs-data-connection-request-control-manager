import { Test, TestingModule } from '@nestjs/testing';
import { OdataController } from './odata.controller';

describe('OdataController', () => {
  let controller: OdataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OdataController],
    }).compile();

    controller = module.get<OdataController>(OdataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

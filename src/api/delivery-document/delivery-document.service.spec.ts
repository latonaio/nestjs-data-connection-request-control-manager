import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryDocumentService } from './delivery-document.service';

describe('DeliveryDocumentService', () => {
  let service: DeliveryDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryDocumentService],
    }).compile();

    service = module.get<DeliveryDocumentService>(DeliveryDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

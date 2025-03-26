import { Test, TestingModule } from '@nestjs/testing';
import { WalkRequestService } from './walk_request.service';

describe('WalkRequestService', () => {
  let service: WalkRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalkRequestService],
    }).compile();

    service = module.get<WalkRequestService>(WalkRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

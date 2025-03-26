import { Test, TestingModule } from '@nestjs/testing';
import { WalkRequestController } from './walk_request.controller';

describe('WalkRequestController', () => {
  let controller: WalkRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalkRequestController],
    }).compile();

    controller = module.get<WalkRequestController>(WalkRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationsController } from './authorizations.controller';

describe('AuthorizationsController', () => {
  let controller: AuthorizationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorizationsController],
    }).compile();

    controller = module.get<AuthorizationsController>(AuthorizationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

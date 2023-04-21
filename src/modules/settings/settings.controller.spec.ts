import { Test, TestingModule } from '@nestjs/testing';
import { MeetController } from './settings.controller';

describe('MeetController', () => {
  let controller: MeetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeetController],
    }).compile();

    controller = module.get<MeetController>(MeetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

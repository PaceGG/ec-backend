import { Test, TestingModule } from '@nestjs/testing';
import { GameSeriesController } from './game-series.controller';

describe('GameSeriesController', () => {
  let controller: GameSeriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameSeriesController],
    }).compile();

    controller = module.get<GameSeriesController>(GameSeriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

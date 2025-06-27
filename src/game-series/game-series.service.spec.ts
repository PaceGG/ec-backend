import { Test, TestingModule } from '@nestjs/testing';
import { GameSeriesService } from './game-series.service';

describe('GameSeriesService', () => {
  let service: GameSeriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameSeriesService],
    }).compile();

    service = module.get<GameSeriesService>(GameSeriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

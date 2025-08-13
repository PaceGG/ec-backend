import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { YoutubeController } from './youtube.controller';
import { YoutubeService } from './youtube.service';

@Module({
  imports: [HttpModule],
  controllers: [YoutubeController],
  providers: [YoutubeService],
})
export class YoutubeModule {}

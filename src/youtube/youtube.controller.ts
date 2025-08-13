import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get('playlist-info')
  async getPlaylistInfo(@Query('playlistId') playlistId: string) {
    if (!playlistId) {
      throw new BadRequestException('playlistId query parameter is required');
    }

    return this.youtubeService.getPlaylistInfo(playlistId);
  }
}

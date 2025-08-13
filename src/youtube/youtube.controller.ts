import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetPlaylistInfoDto, PlaylistInfoResponseDto } from './youtube.dto';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get('playlist-info')
  @ApiOperation({
    summary:
      'Получить количество видео и суммарную длительность (в секундах) плейлиста',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешное получение информации о плейлисте',
    type: PlaylistInfoResponseDto,
  })
  async getPlaylistInfo(@Query() query: GetPlaylistInfoDto) {
    const { playlistId } = query;
    if (!playlistId) {
      throw new BadRequestException('playlistId query parameter is required');
    }
    return this.youtubeService.getPlaylistInfo(playlistId);
  }
}

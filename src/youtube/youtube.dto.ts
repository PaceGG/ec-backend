import { ApiProperty } from '@nestjs/swagger';

export class GetPlaylistInfoDto {
  @ApiProperty({
    description: 'ID плейлиста YouTube',
    example: 'PL9tY0BWXOZFt9uTXi68XOEYs6mEBBOt9M',
  })
  playlistId!: string;
}

export class PlaylistInfoResponseDto {
  @ApiProperty({ example: 10, description: 'Количество видео в плейлисте' })
  videoCount!: number;

  @ApiProperty({
    example: 3600,
    description: 'Суммарная длительность плейлиста в секундах',
  })
  duration!: number;
}

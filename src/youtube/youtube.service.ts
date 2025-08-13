import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

interface PlaylistItemsResponse {
  items: { contentDetails: { videoId: string; duration?: string } }[];
  nextPageToken?: string;
}

interface PlaylistItem {
  contentDetails: {
    videoId: string;
  };
}

@Injectable()
export class YoutubeService {
  private readonly apiKey = process.env.YOUTUBE_API_KEY;

  constructor(private readonly httpService: HttpService) {
    if (!this.apiKey) {
      throw new Error('YOUTUBE_API_KEY is not set in environment variables');
    }
  }

  async getPlaylistInfo(playlistId: string) {
    try {
      let allVideoIds: string[] = [];
      let nextPageToken: string | undefined = undefined;

      do {
        const url = 'https://www.googleapis.com/youtube/v3/playlistItems';
        const params: Record<string, any> = {
          part: 'contentDetails',
          playlistId,
          maxResults: 50,
          key: this.apiKey,
        };
        if (nextPageToken) {
          params.pageToken = nextPageToken;
        }

        const response = await firstValueFrom(
          this.httpService.get(url, { params }),
        );

        const data = response.data as PlaylistItemsResponse;

        allVideoIds = allVideoIds.concat(
          data.items.map((item: PlaylistItem) => item.contentDetails.videoId),
        );
        nextPageToken = data.nextPageToken;
      } while (nextPageToken);

      if (allVideoIds.length === 0) {
        return { videoCount: 0, totalDurationSeconds: 0 };
      }

      let totalSeconds = 0;
      for (let i = 0; i < allVideoIds.length; i += 50) {
        const idsBatch = allVideoIds.slice(i, i + 50).join(',');

        const url = 'https://www.googleapis.com/youtube/v3/videos';
        const params = {
          part: 'contentDetails',
          id: idsBatch,
          key: this.apiKey,
        };

        const response = await firstValueFrom(
          this.httpService.get(url, { params }),
        );
        const data = response.data as PlaylistItemsResponse;

        for (const item of data.items) {
          const duration = item.contentDetails.duration ?? 'PT0S';
          totalSeconds += this.parseISO8601Duration(duration);
        }
      }

      return {
        videoCount: allVideoIds.length,
        totalDurationSeconds: totalSeconds,
      };
    } catch {
      throw new InternalServerErrorException('Failed to fetch playlist info');
    }
  }

  private parseISO8601Duration(duration: string): number {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = regex.exec(duration);
    const hours = matches?.[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches?.[2] ? parseInt(matches[2], 10) : 0;
    const seconds = matches?.[3] ? parseInt(matches[3], 10) : 0;
    return hours * 3600 + minutes * 60 + seconds;
  }
}

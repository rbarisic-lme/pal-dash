import axios from 'axios';
import { cacheData, getCachedData } from '@rbarisic/local-storage-cache';
import { PUBLIC_YT_API_KEY } from '$env/static/public';

// Create and configure the Axios instance
const youtubeAPI = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: PUBLIC_YT_API_KEY,
  },
});

// You can add interceptors or other configurations if needed

export default youtubeAPI;

export const fetchLivestreams = async (): Promise<any[] | undefined> => {
  if(PUBLIC_YT_API_KEY === 'NO_STREAM') return []
  
  let ytvideos = getCachedData('yt-streams');
  if(ytvideos) {
    return ytvideos;
  } else {
    try {
      const response = await youtubeAPI.get('/search', {
        params: {
          q: 'Palworld livestream',
          type: 'video',
          eventType: 'live',
          part: 'id,snippet',
          maxResults: 5,
        },
      });
  
      const items = response.data.items;
  
      cacheData('yt-streams', items, 3600000);

      items.forEach(item => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const channelTitle = item.snippet.channelTitle;
        console.log(`Title: ${title}, Video ID: ${videoId}, Channel: ${channelTitle}`);
      });
  
      return items;
  
    } catch (error: Error | any) {
      console.error('Error fetching YouTube data:', error.message);
    }
  }
}

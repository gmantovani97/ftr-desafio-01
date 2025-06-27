import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface OriginalLink {
  id: string;
  originalUrl: string;
  shortUrl: string;
  visits: number;
  createdAt: Date;
}

async function getOriginalLink(shortUrl: string): Promise<OriginalLink> {
  const response = await axios.get(`http://localhost:3333/link/${shortUrl}`);

  return response.data;
}

export function useGetOriginalLink(shortUrl: string) {
  return useQuery({
    queryKey: ['original-link', shortUrl],
    queryFn: () => getOriginalLink(shortUrl),
    retry: false,
  });
}

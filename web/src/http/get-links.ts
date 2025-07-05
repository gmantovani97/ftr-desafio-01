import { getUserSessionId } from '@/utils/userSession';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Link {
  id: string;
  shortUrl: string;
  originalUrl: string;
  visits: number;
  createdAt: Date;
}

async function getLinks(): Promise<Link[]> {
  const userSessionId = getUserSessionId();

  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/links/${userSessionId}`
  );

  return response.data;
}

export function useGetLinks() {
  return useQuery({
    queryKey: ['links'],
    queryFn: () => getLinks(),
    select: data =>
      data.map(link => ({
        ...link,
        shortUrlPath: link.shortUrl,
        shortUrl: `${import.meta.env.VITE_FRONTEND_URL}/${link.shortUrl}`,
      })),
  });
}

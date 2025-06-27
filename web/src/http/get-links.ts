import { getUserSessionId } from '@/utils/userSession';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';

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
    `http://localhost:3333/links/${userSessionId}`
  );

  return response.data;
}

export function useGetLinks() {
  const origin = useMemo(() => window.location.origin, []);

  return useQuery({
    queryKey: ['links'],
    queryFn: () => getLinks(),
    select: data =>
      data.map(link => ({
        ...link,
        shortUrlPath: link.shortUrl,
        shortUrl: `${origin}/${link.shortUrl}`,
      })),
  });
}

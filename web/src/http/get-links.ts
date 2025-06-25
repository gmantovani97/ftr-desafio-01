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
    `http://localhost:3333/links/${userSessionId}`
  );

  return response.data;
}

export function useGetLinks() {
  return useQuery({
    queryKey: ['links'],
    queryFn: () => getLinks(),
  });
}
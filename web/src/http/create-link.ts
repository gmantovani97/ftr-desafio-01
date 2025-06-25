import { getUserSessionId } from '@/utils/userSession';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export async function createLink(
  originalUrl: string,
  shortUrl: string
): Promise<void> {
  const userSessionId = getUserSessionId();

  const response = await axios.post('http://localhost:3333/link', {
    originalUrl,
    shortUrl,
    userSessionId,
  });

  return response.data;
}

export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      originalUrl,
      shortUrl,
    }: {
      originalUrl: string;
      shortUrl: string;
    }) => createLink(originalUrl, shortUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
  });
}

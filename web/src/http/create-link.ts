import { getUserSessionId } from '@/utils/userSession';
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import axios, { HttpStatusCode } from 'axios';

export async function createLink(
  originalUrl: string,
  shortUrl: string
): Promise<HttpStatusCode> {
  const userSessionId = getUserSessionId();

  return axios.post('http://localhost:3333/link', {
    originalUrl,
    shortUrl,
    userSessionId,
  });
}

export function useCreateLink(): UseMutationResult<
  HttpStatusCode,
  Error,
  {
    originalUrl: string;
    shortUrl: string;
  }
> {
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

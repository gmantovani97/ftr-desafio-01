import { getUserSessionId } from '@/utils/userSession';
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import axios, { AxiosError, HttpStatusCode } from 'axios';

export async function createLink(
  originalUrl: string,
  shortUrl: string
): Promise<HttpStatusCode> {
  const userSessionId = getUserSessionId();

  try {
    const response = await axios.post('http://localhost:3333/link', {
      originalUrl,
      shortUrl,
      userSessionId,
    });

    return response.status;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.status ?? HttpStatusCode.InternalServerError;
    }

    return HttpStatusCode.InternalServerError;
  }
}

export function useCreateLink(): UseMutationResult<
  HttpStatusCode,
  Error,
  {
    originalUrl: string;
    shortUrl: string;
  },
  {
    onSuccess: () => void;
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

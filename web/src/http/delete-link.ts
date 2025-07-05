import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import axios from 'axios';

export async function deleteLink(id: string): Promise<void> {
  return axios.delete(`${import.meta.env.VITE_BACKEND_URL}/link/${id}`);
}

export function useDeleteLink(): UseMutationResult<
  void,
  Error,
  {
    id: string;
  }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
  });
}

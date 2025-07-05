import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface UpdateVisitsProps {
  id?: string;
  originalUrl?: string;
}

async function updateVisits(id?: string): Promise<void> {
  const response = await axios.patch(
    `${import.meta.env.VITE_BACKEND_URL}/update-visits/${id}`
  );

  return response.data;
}

export function useUpdateVisits({ id, originalUrl }: UpdateVisitsProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateVisits(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      if (originalUrl) {
        window.location.replace(originalUrl);
      }
    },
  });
}

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

async function updateVisits(id: string): Promise<void> {
  const response = await axios.patch(
    `http://localhost:3333/update-visits/${id}`
  );

  return response.data;
}

export function useUpdateVisits(id: string) {
  return useMutation({
    mutationFn: () => updateVisits(id),
  });
}

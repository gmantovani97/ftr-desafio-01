import { useToast } from '@/hooks/useToast';
import { getUserSessionId } from '@/utils/userSession';
import { useMutation } from '@tanstack/react-query';
import axios, { type AxiosResponse } from 'axios';

async function createReport(
  userSessionId: string
): Promise<AxiosResponse<{ reportUrl: string }>> {
  return await axios.post<{ reportUrl: string }>(
    `${import.meta.env.VITE_BACKEND_URL}/report`,
    {
      userSessionId,
    }
  );
}

const handleDownloadReport = (reportUrl: string) => {
  const anchor = document.createElement('a');
  anchor.href = reportUrl;
  anchor.download = 'report.csv';
  anchor.click();
  anchor.remove();
};

export function useCreateReport() {
  const { notify } = useToast();

  return useMutation({
    mutationFn: () => createReport(getUserSessionId()),
    onSuccess: data => {
      notify({
        message: 'Relatório gerado com sucesso',
        type: 'success',
      });
      handleDownloadReport(data.data.reportUrl);
    },
    onError: () => {
      notify({
        message: 'Erro ao gerar relatório',
        type: 'error',
      });
    },
  });
}

import { Button, Card } from '@/components';
import { useGetLinks } from '@/http/get-links';
import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react';
import { HomePageListItem } from './home-page-list-item';
import { useCreateReport } from '@/http/create-report';

export function HomePageLinksList() {
  const { data, isLoading, isError } = useGetLinks();
  const { mutate: createReport } = useCreateReport();

  return (
    <Card isLoading={isLoading}>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">Meus links</h1>
        <Button variant="secondary" onClick={() => createReport()}>
          <DownloadSimpleIcon size={16} />
          Baixar CSV
        </Button>
      </div>
      {isLoading && (
        <div className="flex flex-col items-center gap-2 border-t border-gray-200 p-4 pb-6 mt-4">
          <span className="text-xxs text-gray-500">Carregando links...</span>
        </div>
      )}
      {!isLoading && !isError && !data?.length && (
        <div className="flex flex-col items-center gap-2 border-t border-gray-200 p-4 pb-6 mt-4">
          <LinkIcon size={32} className="text-gray-400" weight="bold" />
          <span className="text-xxs text-gray-500">
            AINDA NÃO EXISTEM LINKS CADASTRADOS
          </span>
        </div>
      )}
      {data?.length && !isLoading && !isError && (
        <div className="flex flex-col gap-2 border-t mt-4 border-gray-200 sm:overflow-y-auto sm:max-h-[calc(50vh)]">
          {data.map(link => (
            <HomePageListItem key={link.id} {...link} />
          ))}
        </div>
      )}
    </Card>
  );
}

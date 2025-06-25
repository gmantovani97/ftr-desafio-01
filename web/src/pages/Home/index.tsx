import { Button, Card, Input } from '@/components';
import { getUserSessionId } from '@/utils/userSession';
import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Header } from './components/header';
import { ListItem } from './components/list-item';

interface Link {
  id: string;
  shortUrl: string;
  originalUrl: string;
  visits: number;
  createdAt: Date;
}

export function Home() {
  const [links, setLinks] = useState<Link[] | undefined>(undefined);
  const retrieveLinks = async (): Promise<Link[] | undefined> => {
    const userSessionId = getUserSessionId();

    const response = await fetch(
      `http://localhost:3333/links/${userSessionId}`
    );

    if (response.ok) {
      console.log('Links retrieved successfully');
      return response.json();
    } else {
      console.error('Failed to retrieve links');
      return undefined;
    }
  };

  useEffect(() => {
    retrieveLinks().then(setLinks);
  }, []);

  const handleCreateLink = async () => {
    const userSessionId = getUserSessionId();

    const originalUrl = 'https://www.google.com';
    const shortUrl = 'https://brev.ly/google';

    const response = await fetch('http://localhost:3333/link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        originalUrl,
        shortUrl,
        userSessionId,
      }),
    });

    if (response.ok) {
      console.log('Link created successfully');
    } else {
      console.error('Failed to create link');
    }
  };

  return (
    <div className="h-full sm:overflow-hidden sm:h-screen bg-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 px-3 py-8 gap-3 max-w-[1920px] mx-auto">
        <Header />
        <Card>
          <h1 className="text-lg font-bold mb-5">Novo link</h1>
          <div className="flex flex-col gap-4">
            <Input title="LINK ORIGINAL" placeholder="www.exemplo.com.br" />
            <Input title="LINK ENCURTADO" placeholder="brev.ly/" />
          </div>
          <Button className="mt-5" onClick={handleCreateLink}>
            Salvar link
          </Button>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">Meus links</h1>
            <Button variant="secondary">
              <DownloadSimpleIcon size={16} />
              Baixar CSV
            </Button>
          </div>
          {links?.length ? (
            <div className="flex flex-col gap-2 border-t mt-4 border-gray-200 sm:overflow-y-auto sm:max-h-[calc(50vh)]">
              {links.map(link => (
                <ListItem key={link.id} {...link} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 border-t border-gray-200 p-4 pb-6 mt-4">
              <LinkIcon size={32} className="text-gray-400" weight="bold" />
              <span className="text-xxs text-gray-500">
                AINDA NÃO EXISTEM LINKS CADASTRADOS
              </span>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

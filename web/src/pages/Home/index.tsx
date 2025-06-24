import { Button, Card, Input } from 'components';
import { Header } from './components/header';
import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react';
import { useMemo } from 'react';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { ListItem } from './components/list-item';

export function Home() {
  const links = useMemo(() => {
    return Array.from({ length: 10 }).map(() => {
      const originalUrl = faker.internet
        .url({ appendSlash: false })
        .replace('https://', '');
      const shortUrl = `brev.ly/${originalUrl.split('.')[0]}`;

      return {
        id: faker.string.uuid(),
        shortUrl,
        originalUrl,
        visits: faker.number.int({ min: 0, max: 1000 }),
        createdAt: faker.date.recent().toISOString(),
      };
    });
  }, []);

  console.log(links);

  return (
    <div className="h-full flex bg-gray-200 flex-col items-center px-3 py-8 gap-3">
      <Header />
      <Card>
        <h1 className="text-lg font-bold mb-5">Novo link</h1>
        <div className="flex flex-col gap-4">
          <Input title="LINK ORIGINAL" placeholder="www.exemplo.com.br" />
          <Input title="LINK ENCURTADO" placeholder="brev.ly/" />
        </div>
        <Button className="mt-5" disabled>
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
        {links.length ? (
          <div className="flex flex-col gap-2 border-t mt-4 border-gray-200">
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
  );
}

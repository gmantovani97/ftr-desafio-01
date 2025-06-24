import { Button, Card, Input } from 'components';
import { Header } from './components/header';
import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react';

export function Home() {
  return (
    <div className="h-dvh flex bg-gray-200 flex-col items-center px-3 py-8 gap-3">
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
        <div className="flex flex-col items-center gap-2 border-t border-gray-200 p-4 pb-6 mt-4">
          <LinkIcon size={32} className="text-gray-400" />
          <span className="text-xxs text-gray-500">
            AINDA NÃO EXISTEM LINKS CADASTRADOS
          </span>
        </div>
      </Card>
    </div>
  );
}

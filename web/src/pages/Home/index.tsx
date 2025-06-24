import { Card, Input } from 'components';
import { Header } from './components/header';

export function Home() {
  return (
    <div className="h-dvh flex bg-gray-200 flex-col items-center px-3 py-8 gap-3">
      <Header />
      <Card>
        <h1 className="text-lg font-bold mb-5">Novo link</h1>
        <Input title="LINK ORIGINAL" placeholder="www.exemplo.com.br" />
      </Card>
    </div>
  );
}

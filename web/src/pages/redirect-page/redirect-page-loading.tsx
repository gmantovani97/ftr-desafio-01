import logo from '@/assets/logo-icon.svg';
import { Card } from '@/components';
import { useEffect } from 'react';

interface RedirectPageLoadingProps {
  originalUrl: string;
}

export function RedirectPageLoading({ originalUrl }: RedirectPageLoadingProps) {
  useEffect(() => {
    // setTimeout(() => window.location.replace(originalUrl), 2000);
  }, []);

  return (
    <Card className="flex flex-col items-center justify-center px-5 py-12 gap-6">
      <img src={logo} alt="logo" className="h-12" />
      <h1 className="text-2xl font-bold">Redirecionando...</h1>
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-semibold text-gray-500">
          O link será aberto automáticamente em alguns instantes.
        </span>
        <span className="text-sm font-semibold text-gray-500">
          Não foi redirecionado?{' '}
          <a
            className="text-blue-base hover:underline cursor-pointer"
            href={originalUrl}
          >
            Acesse aqui
          </a>
        </span>
      </div>
    </Card>
  );
}

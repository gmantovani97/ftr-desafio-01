import error_image from '@/assets/404.svg';
import logo from '@/assets/logo-icon.svg';
import { Card } from '@/components';
import { useEffect } from 'react';
import { Link } from 'react-router';

interface RedirectPageCardProps {
  isError: boolean;
  originalUrl?: string;
}

export function RedirectPageCard({
  originalUrl,
  isError,
}: RedirectPageCardProps) {
  const image = isError ? error_image : logo;
  const title = isError ? 'Link não encontrado' : 'Redirecionando...';
  const description = isError
    ? 'O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em'
    : ' O link será aberto automáticamente em alguns instantes. Não foi redirecionado?';

  useEffect(() => {
    if (!isError && originalUrl) {
      // setTimeout(() => window.location.replace(originalUrl), 2000);
    }
  }, [originalUrl, isError]);

  return (
    <Card className="flex flex-col items-center justify-center px-5 py-12 gap-6 sm:max-w-[580px] self-center">
      <img src={image} alt="logo" className="h-12" />
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-semibold text-gray-500 text-center">
          {description}{' '}
          {originalUrl ? (
            <Link
              className="text-blue-base hover:underline cursor-pointer"
              to={originalUrl}
            >
              Acesse aqui
            </Link>
          ) : (
            <a
              href={'/'}
              className="text-blue-base hover:underline cursor-pointer"
            >
              brev.ly
            </a>
          )}
        </span>
      </div>
    </Card>
  );
}

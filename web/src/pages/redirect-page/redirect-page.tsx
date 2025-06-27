import { useGetOriginalLink } from '@/http/get-original-link';
import { useParams } from 'react-router';
import { RedirectPageCard } from './redirect-page-card';

export function RedirectPage() {
  const { shortUrl } = useParams<{ shortUrl: string }>();

  const { data, isError } = useGetOriginalLink(shortUrl!);

  return (
    <div className="h-screen sm:overflow-hidden bg-gray-200">
      <div className="flex h-full items-center justify-center px-3 py-8 gap-3 max-w-[1280px] mx-auto">
        <RedirectPageCard
          id={data?.id}
          originalUrl={data?.originalUrl}
          isError={isError}
        />
      </div>
    </div>
  );
}

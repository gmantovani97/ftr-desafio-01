import { Button } from '@/components';
import { useDeleteLink } from '@/http/delete-link';
import { CopyIcon, TrashIcon } from '@phosphor-icons/react';
import { Link } from 'react-router';

interface HomePageListItemProps {
  id: string;
  shortUrl: string;
  shortUrlPath: string;
  originalUrl: string;
  visits: number;
}

export function HomePageListItem({
  id,
  originalUrl,
  shortUrl,
  shortUrlPath,
  visits,
}: HomePageListItemProps) {
  const { mutate: deleteLink } = useDeleteLink();

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <div className="flex items-center justify-between w-full py-3 px-0.5 border-b border-gray-200">
      <div className="flex flex-1 items-center gap-2">
        <div className="flex flex-1 flex-col">
          <Link
            to={`/${shortUrlPath}`}
            className="text-sm font-semibold text-blue-base"
          >
            {shortUrl}
          </Link>
          <span className="text-xs text-gray-500">{originalUrl}</span>
        </div>
        <span className="text-xs text-gray-500">{`${visits} acessos`}</span>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="icon" onClick={handleCopyToClipboard}>
            <CopyIcon size={16} className="text-gray-600" />
          </Button>
          <Button variant="icon" onClick={() => deleteLink({ id })}>
            <TrashIcon size={16} className="text-gray-600" />
          </Button>
        </div>
      </div>
    </div>
  );
}

import { CopyIcon, TrashIcon } from '@phosphor-icons/react';
import { Button } from '@/components';

interface ListItemProps {
  id: string;
  shortUrl: string;
  originalUrl: string;
  visits: number;
  createdAt: string;
}

export function ListItem({
  createdAt,
  id,
  originalUrl,
  shortUrl,
  visits,
}: ListItemProps) {
  return (
    <div className="flex items-center justify-between w-full py-3 border-b border-gray-200">
      <div className="flex flex-1 items-center gap-2">
        <div className="flex flex-1 flex-col">
          <span className="text-sm font-semibold text-blue-base">
            {shortUrl}
          </span>
          <span className="text-xs text-gray-500">{originalUrl}</span>
        </div>
        <span className="text-xs text-gray-500">{`${visits} acessos`}</span>
        <div className="flex items-center gap-2">
          <Button variant="icon">
            <CopyIcon size={16} className="text-gray-600" />
          </Button>
          <Button variant="icon">
            <TrashIcon size={16} className="text-gray-600" />
          </Button>
        </div>
      </div>
    </div>
  );
}

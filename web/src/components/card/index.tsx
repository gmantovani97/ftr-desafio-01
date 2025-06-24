import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm shadow-gray-200 p-6 w-full">
      {children}
    </div>
  );
}

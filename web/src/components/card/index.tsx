import type { ComponentProps, ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const cardVariants = tv({
  base: 'bg-white rounded-lg shadow-sm shadow-gray-200 p-6 w-full self-start',
});

type CardProps = ComponentProps<'div'> &
  VariantProps<typeof cardVariants> & {
    children: ReactNode;
  };

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cardVariants({ className })} {...props}>
      {children}
    </div>
  );
}

import type { ComponentProps, ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { IndeterminateLoader } from '../indeterminate-loader/inderteminate-loader';

const cardVariants = tv({
  base: 'bg-white rounded-lg shadow-sm shadow-gray-200 p-6 w-full self-start relative',
});

type CardProps = ComponentProps<'div'> &
  VariantProps<typeof cardVariants> & {
    children: ReactNode;
    isLoading?: boolean;
  };

export function Card({ children, className, isLoading, ...props }: CardProps) {
  return (
    <div className={cardVariants({ className })} {...props}>
      {isLoading && (
        <div className="w-full absolute top-0 left-0 [&>div]:rounded-t-lg">
          <IndeterminateLoader />
        </div>
      )}
      {children}
    </div>
  );
}

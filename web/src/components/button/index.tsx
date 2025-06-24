import type { ComponentProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'bg-blue-base rounded-lg h-12 w-full text-white font-semibold hover:bg-blue-dark disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none',
  variants: {
    variant: {
      primary: '',
      secondary:
        'w-auto p-2 bg-gray-200 text-gray-500 [&>svg]:text-gray-600 flex items-center gap-1.5 text-xs hover:bg-gray-200 hover:outline-none hover:ring-1 hover:ring-blue-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>;

export function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={buttonVariants({ variant, className })}
      {...props}
    />
  );
}

import type { ComponentProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'bg-blue-base rounded-lg h-12 w-full text-white font-semibold hover:bg-blue-dark disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none transition-all',
  variants: {
    variant: {
      primary: '',
      secondary:
        'w-auto p-2 bg-gray-200 text-gray-500 [&>svg]:text-gray-600 flex items-center gap-1.5 text-xs hover:bg-gray-200 hover:outline-none hover:ring-1 hover:ring-blue-base',
      icon: 'w-auto h-auto p-2 bg-gray-200 rounded-sm text-gray-500 [&>svg]:text-gray-600 flex items-center gap-1.5 text-xs hover:bg-gray-200 hover:outline-none hover:ring-1 hover:ring-blue-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
  };

export function Button({
  variant,
  className,
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={buttonVariants({ variant, className })}
      {...props}
    >
      {isLoading ? (
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin justify-self-center" />
      ) : (
        props.children
      )}
    </button>
  );
}

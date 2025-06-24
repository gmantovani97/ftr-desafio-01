import { WarningIcon } from '@phosphor-icons/react';
import type { ComponentProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const inputVariants = tv({
  base: 'w-full h-12 px-4 rounded-md text-sm placeholder-gray-400 ring-1 ring-gray-300 focus:outline-none focus:ring-[1.5px] focus:ring-blue-base caret-blue-base focus:placeholder:text-transparent',
  variants: {
    error: {
      true: 'ring-feedback-danger ring-[1.5px] focus:ring-feedback-danger',
    },
  },
});

type InputProps = ComponentProps<'input'> &
  VariantProps<typeof inputVariants> & {
    title: string;
    errorMessage?: string;
  };

export function Input({
  className,
  error,
  errorMessage,
  title,
  ...props
}: InputProps) {
  return (
    <div
      className="flex flex-col gap-2 focus-within:[&>label]:text-blue-base focus-within:[&>label]:font-bold group"
      aria-invalid={error}
    >
      <label className="text-xxs text-gray-500 group-aria-invalid:text-feedback-danger!">
        {title}
      </label>
      <input
        type="text"
        className={inputVariants({ error, className })}
        {...props}
      />
      {errorMessage && (
        <div className="flex items-center gap-2">
          <WarningIcon
            weight="bold"
            size={16}
            className="text-feedback-danger"
          />
          <span className="text-sm text-gray-500">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

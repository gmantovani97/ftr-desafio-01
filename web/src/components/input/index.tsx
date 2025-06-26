import { WarningIcon } from '@phosphor-icons/react';
import type { ComponentProps } from 'react';
import { tv } from 'tailwind-variants';

const inputContainerVariant = tv({
  base: 'flex items-center w-full h-12 px-4 rounded-md ring-1 ring-gray-300 focus-within:outline-none focus-within:ring-[1.5px] focus-within:ring-blue-base caret-blue-base focus-within:placeholder:text-transparent',
  variants: {
    error: {
      true: 'ring-feedback-danger ring-[1.5px] focus-within:ring-feedback-danger',
    },
  },
});

type InputProps = ComponentProps<'input'> & {
  title: string;
  errorMessage?: string;
  error?: boolean;
  prefix?: string;
};

export function Input({
  error,
  errorMessage,
  title,
  prefix,
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
      <div className={inputContainerVariant({ error })}>
        {prefix && <span className="text-sm text-gray-400">{prefix}</span>}
        <input
          type="text"
          className="w-full h-full text-sm placeholder-gray-400 outline-none"
          {...props}
        />
      </div>
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

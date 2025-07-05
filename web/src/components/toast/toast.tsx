import { tv, type VariantProps } from 'tailwind-variants';

const toastVariants = tv({
  base: 'max-w-xs bg-red-500 text-sm text-white rounded-md shadow-lg  mb-3 ml-3 transition duration-300 ease-in-out',
  variants: {
    type: {
      success: 'bg-green-500',
      error: 'bg-red-500',
    },
  },
});

export type ToastProps = VariantProps<typeof toastVariants> & {
  message: string;
};

export function Toast({ message, type }: ToastProps) {
  return (
    <div>
      <div className={toastVariants({ type })} role="alert">
        <div className="flex p-4">
          <span className="text-sm font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
}

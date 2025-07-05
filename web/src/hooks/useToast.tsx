import { Toast, type ToastProps } from '@/components/toast/toast';
import toast from 'react-hot-toast';

interface UseToastReturn {
  notify: (props: ToastProps) => void;
}

export function useToast(): UseToastReturn {
  const notify = (props: ToastProps) => {
    const { type, message } = props;

    toast.custom(() => <Toast type={type} message={message} />);
  };

  return { notify };
}

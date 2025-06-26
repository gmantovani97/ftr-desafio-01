import { Button, Card, Input } from '@/components';
import { useCreateLink } from '@/http/create-link';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError, HttpStatusCode } from 'axios';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  originalUrl: z.string().url({ message: 'Link inválido' }),
  shortUrl: z.string().min(1, { message: 'O campo é obrigatório' }),
});

type Inputs = z.infer<typeof formSchema>;

const BASE_URL = 'https://brev.ly/';

export function HomePageForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    reset,
  } = useForm<Inputs>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const { mutate: createLink, isPending } = useCreateLink();

  const onError = (error: Error) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === HttpStatusCode.Conflict) {
        setError('shortUrl', { message: 'O link encurtado já existe' });
      }
    }
  };

  const onSuccess = () => {
    reset();
  };

  const generateShortUrl = (shortUrl: string) => `${BASE_URL}${shortUrl}`;

  const onSubmit: SubmitHandler<Inputs> = ({ originalUrl, shortUrl }) => {
    createLink(
      { originalUrl, shortUrl: generateShortUrl(shortUrl) },
      {
        onError,
        onSuccess,
      }
    );
  };

  return (
    <Card>
      <h1 className="text-lg font-bold mb-5">Novo link</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Input
            title="LINK ORIGINAL"
            placeholder="www.exemplo.com.br"
            error={!!errors.originalUrl?.message}
            errorMessage={errors.originalUrl?.message}
            {...register('originalUrl')}
          />
          <Input
            title="LINK ENCURTADO"
            prefix="brev.ly/"
            error={!!errors.shortUrl?.message}
            errorMessage={errors.shortUrl?.message}
            {...register('shortUrl')}
          />
        </div>
        <Button
          className="mt-5"
          type="submit"
          isLoading={isPending}
          disabled={!isValid}
        >
          Salvar link
        </Button>
      </form>
    </Card>
  );
}

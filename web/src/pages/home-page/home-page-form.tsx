import { Button, Card, Input } from '@/components';
import { useCreateLink } from '@/http/create-link';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError, HttpStatusCode } from 'axios';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  originalUrl: z.string().url(),
  shortUrl: z.string().min(1),
});

type Inputs = z.infer<typeof formSchema>;

export function HomePageForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: createLink, error, isPending } = useCreateLink();

  console.log('errorerror', error);

  const onError = (error: Error) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === HttpStatusCode.Conflict) {
        setError('shortUrl', { message: 'O link encurtado já existe' });
      }
    }
  };

  const onSubmit: SubmitHandler<Inputs> = ({ originalUrl, shortUrl }) => {
    createLink(
      { originalUrl, shortUrl },
      {
        onError,
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
            {...register('originalUrl')}
          />
          <Input
            title="LINK ENCURTADO"
            placeholder="brev.ly/"
            error={!!errors.shortUrl?.message}
            errorMessage={errors.shortUrl?.message}
            {...register('shortUrl')}
          />
        </div>
        <Button className="mt-5" type="submit" isLoading={isPending}>
          Salvar link
        </Button>
      </form>
    </Card>
  );
}

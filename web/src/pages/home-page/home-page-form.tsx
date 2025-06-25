import { Button, Card, Input } from '@/components';
import { useCreateLink } from '@/http/create-link';
import { zodResolver } from '@hookform/resolvers/zod';
import { HttpStatusCode } from 'axios';
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
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: createLink, isPending } = useCreateLink();

  const onSubmit: SubmitHandler<Inputs> = async ({ originalUrl, shortUrl }) => {
    const status = await createLink({ originalUrl, shortUrl });

    if (status === HttpStatusCode.Conflict) {
      setError('shortUrl', { message: 'O link encurtado já existe' });
    }
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

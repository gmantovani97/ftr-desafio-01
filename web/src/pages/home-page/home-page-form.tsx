import { Button, Card, Input } from '@/components';
import { useCreateLink } from '@/http/create-link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  originalUrl: z.string().url(),
  shortUrl: z.string().min(1),
});

type Inputs = z.infer<typeof formSchema>;

export function HomePageForm() {
  const { register, handleSubmit, formState } = useForm<Inputs>({
    resolver: zodResolver(formSchema),
  });
  const { mutate: createLink, isPending } = useCreateLink();

  const onSubmit: SubmitHandler<Inputs> = ({ originalUrl, shortUrl }) => {
    createLink({ originalUrl, shortUrl });
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

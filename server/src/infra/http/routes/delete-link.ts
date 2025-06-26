import { deleteLink } from '@/app/functions/delete-link';
import { isRight } from '@/shared/either';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete('/link/:id', {
    schema: {
      summary: 'Delete a link',
      params: z.object({
        id: z.string().uuid(),
      }),
      response: {
        204: z.null(),
      },
    },
  }, async (request, reply) => {
    const { id } = request.params;

    const result = await deleteLink({ id });

    if (isRight(result)) {
      return reply.status(204).send();
    }
  });
};
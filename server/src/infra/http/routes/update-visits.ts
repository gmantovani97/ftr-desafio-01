import { updateVisits } from '@/app/functions/update-visits';
import { isRight } from '@/shared/either';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

export const updateVisitsRoute: FastifyPluginAsyncZod = async server => {
  server.patch('/update-visits/:id', {
    schema: {
      summary: 'Get original link by short url',
      params: z.object({
        id: z.string(),
      }),
      response: {
        204: z.null(),
      },
    },
  }, async (request, reply) => {
    const { id } = request.params;

    const result = await updateVisits(id);

    if (isRight(result)) {
      return reply.status(204).send(null);
    }
  })
}
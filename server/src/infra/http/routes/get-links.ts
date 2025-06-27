import { getLinks } from '@/app/functions/get-links';
import { isRight, unwrapEither } from '@/shared/either';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

export const getLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get('/links/:userSessionId', {
    schema: {
      summary: 'Get links by user session id',
      params: z.object({
        userSessionId: z.string().uuid(),
      }),
      response: {
        200: z.array(z.object({
          id: z.string().uuid(),
          originalUrl: z.string().url(),
          shortUrl: z.string(),
          visits: z.number(),
          createdAt: z.date(),
        })),
      },
    },
  }, async (request, reply) => {
    const { userSessionId } = request.params;

    const result = await getLinks(userSessionId);

    if (isRight(result)) {
      return reply.status(200).send(unwrapEither(result));
    }
  })
}
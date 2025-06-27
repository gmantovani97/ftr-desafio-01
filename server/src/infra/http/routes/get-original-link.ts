import { LinkNotFoundError } from '@/app/functions/errors/link-not-found';
import { getOriginalLink } from '@/app/functions/get-original-link';
import { isRight, unwrapEither } from '@/shared/either';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

export const getOriginalLinkRoute: FastifyPluginAsyncZod = async server => {
  server.get('/link/:shortUrl', {
    schema: {
      summary: 'Get original link by short url',
      params: z.object({
        shortUrl: z.string(),
      }),
      response: {
        200: z.object({
          id: z.string().uuid(),
          originalUrl: z.string().url(),
          shortUrl: z.string(),
          visits: z.number(),
          createdAt: z.date(),
        }),
        404: z.object({
          message: z.string(),
        }),
      },
    },
  }, async (request, reply) => {
    const { shortUrl } = request.params;

    const result = await getOriginalLink(shortUrl);

    if (isRight(result)) {
      return reply.status(200).send(unwrapEither(result));
    }

    if (unwrapEither(result) instanceof LinkNotFoundError) {
      return reply.status(404).send({ message: unwrapEither(result).message });
    }

    return reply.status(500).send({ message: 'Internal server error' });
  })
}
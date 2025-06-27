import { createLink } from '@/app/functions/create-link'
import { isRight, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/link',
    {
      schema: {
        summary: 'Create a new link',
        body: z.object({
          originalUrl: z.string().url(),
          shortUrl: z.string(),
          userSessionId: z.string().uuid(),
        }),
        response: {
          204: z.null(),
          409: z.object({
            message: z.string(),
          }).describe('Link already exists'),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl, userSessionId } = request.body

      const result = await createLink({ originalUrl, shortUrl, userSessionId })

      if (isRight(result)) {
        return reply.status(204).send()
      }

      const error = unwrapEither(result)

      if (error.constructor.name === 'LinkAlreadyExistsError') {
        return reply.status(409).send({ message: 'O link encurtado já existe' });
      }
    }
  )
}

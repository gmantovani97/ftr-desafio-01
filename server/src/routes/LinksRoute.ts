import LinksController from '@/controllers/LinksController'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

const linksController = new LinksController()

export const linksRoutes: FastifyPluginAsyncZod = async server => {
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
    linksController.create
  )

  server.get(
    '/links/:userSessionId',
    {
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
    },
    linksController.index
  )

  server.delete(
    '/link/:id',
    {
      schema: {
        summary: 'Delete a link',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    linksController.delete
  )

  server.get(
    '/link/:shortUrl',
    {
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
    },
    linksController.getByShortUrl
  )

  server.patch(
    '/update-visits/:id',
    {
      schema: {
        summary: 'Update visits count',
        params: z.object({
          id: z.string(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    linksController.updateVisits
  )
} 
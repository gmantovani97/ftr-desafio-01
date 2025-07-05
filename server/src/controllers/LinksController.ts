import { LinkNotFoundError } from '@/app/errors/link-not-found'
import { isRight, unwrapEither } from '@/shared/either'
import { LinksService } from '@/services/LinksService'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const linksService = new LinksService()

export default class LinksController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      originalUrl: z.string().url(),
      shortUrl: z.string(),
      userSessionId: z.string().uuid(),
    })

    const { originalUrl, shortUrl, userSessionId } = bodySchema.parse(request.body)

    const result = await linksService.create({ originalUrl, shortUrl, userSessionId })

    if (isRight(result)) {
      return reply.status(204).send()
    }

    const error = unwrapEither(result)

    if (error.constructor.name === 'LinkAlreadyExistsError') {
      return reply.status(409).send({ message: 'O link encurtado já existe' });
    }
  }

  async index(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      userSessionId: z.string().uuid(),
    })

    const { userSessionId } = paramsSchema.parse(request.params)

    const result = await linksService.getByUserSession(userSessionId)

    if (isRight(result)) {
      return reply.status(200).send(unwrapEither(result))
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const result = await linksService.delete({ id })

    if (isRight(result)) {
      return reply.status(204).send()
    }
  }

  async getByShortUrl(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      shortUrl: z.string(),
    })

    const { shortUrl } = paramsSchema.parse(request.params)

    const result = await linksService.getByShortUrl(shortUrl)

    if (isRight(result)) {
      return reply.status(200).send(unwrapEither(result))
    }

    if (unwrapEither(result) instanceof LinkNotFoundError) {
      return reply.status(404).send({ message: unwrapEither(result).message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }

  async updateVisits(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      id: z.string(),
    })

    const { id } = paramsSchema.parse(request.params)

    const result = await linksService.updateVisits(id)

    if (isRight(result)) {
      return reply.status(204).send(null)
    }
  }
}
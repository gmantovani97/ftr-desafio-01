import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ReportsService } from "@/services/ReportsService";
import { unwrapEither } from "@/shared/either";

const reportsService = new ReportsService()

export class ReportsController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      userSessionId: z.string().uuid(),
    })

    const { userSessionId } = bodySchema.parse(request.body)

    const result = await reportsService.create({ userSessionId })

    const { reportUrl } = unwrapEither(result)

    return reply.status(200).send({ reportUrl })
  }
}
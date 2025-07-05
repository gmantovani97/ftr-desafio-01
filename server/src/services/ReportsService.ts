import { db, pg } from "@/infra/db";
import { links } from "@/infra/db/schemas/links";
import { uploadFileToStorage } from "@/infra/storage/upload";
import { Either, makeRight } from "@/shared/either";
import { stringify } from "csv-stringify";
import { eq } from "drizzle-orm";
import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { z } from "zod";

const createReportInput = z.object({
  userSessionId: z.string().uuid(),
})

type CreateReportOutput = {
  reportUrl: string
}

type CreateReportInput = z.input<typeof createReportInput>

export class ReportsService {
  async create(input: CreateReportInput): Promise<Either<never, CreateReportOutput>> {
    const { userSessionId } = createReportInput.parse(input)
    const { sql, params } = db.select().from(links).where(eq(links.userSessionId, userSessionId)).toSQL();

    const cursor = pg.unsafe(sql, params as string[]).cursor(1);

    const csv = stringify({
      delimiter: ',',
      header: true,
      columns: [
        { key: 'id', header: 'ID' },
        { key: 'originalUrl', header: 'Original Url' },
        { key: 'shortUrl', header: 'Short Url' },
        { key: 'visits', header: 'Visits' },
        { key: 'createdAt', header: 'Created at' },
      ],
    })

    const pipelinePassThroughStream = new PassThrough()

    const uploadCsv = uploadFileToStorage({
      contentType: 'text/csv',
      fileName: `${new Date().toISOString()}-links.csv`,
      folder: 'downloads',
      contentStream: pipelinePassThroughStream,
    })

    const pipelineStream = pipeline(
      cursor,
      new Transform({
        objectMode: true,
        transform(chunks: unknown[], _encoding, callback) {
          for (const chunk of chunks) {
            this.push(normalizeData(chunk))
          }
          callback()
        },
      }),
      csv,
      pipelinePassThroughStream
    )
  
    const [{ url }] = await Promise.all([uploadCsv, pipelineStream])

    return makeRight({ reportUrl: url })
  }
}

export function normalizeData(chunk: any) {
	return {
		id: chunk.id,
		originalUrl: chunk.original_url,
		shortUrl: chunk.short_url,
		visits: chunk.visits,
		createdAt: chunk.created_at,
	}
}
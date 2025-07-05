import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas/links";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { desc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { LinkAlreadyExistsError } from "@/app/errors/link-already-exists";
import { LinkNotFoundError } from "@/app/errors/link-not-found";

const createLinkInput = z.object({
  originalUrl: z.string().url(),
  shortUrl: z.string(),
  userSessionId: z.string().uuid(),
})

const deleteLinkInput = z.object({
  id: z.string().uuid(),
})

type CreateLinkInput = z.input<typeof createLinkInput>
type DeleteLinkInput = z.input<typeof deleteLinkInput>

type GetLinksOutput = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  visits: number;
  createdAt: Date;
}[]

type GetOriginalLinkOutput = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  visits: number;
  createdAt: Date;
}

export class LinksService {
  async create(input: CreateLinkInput): Promise<Either<LinkAlreadyExistsError, null>> {
    const { originalUrl, shortUrl, userSessionId } = createLinkInput.parse(input)

    try {
      await db.insert(links).values({
        originalUrl,
        shortUrl,
        userSessionId,
      })
      
      return makeRight(null)
    } catch (error) {
      console.log('error: ', error)
      
      if (error instanceof Error && error.message.includes('duplicate key value violates unique constraint')) {
        return makeLeft(new LinkAlreadyExistsError())
      }

      throw error
    }
  }

  async delete(input: DeleteLinkInput): Promise<Either<never, null>> {
    const { id } = deleteLinkInput.parse(input)

    await db.delete(links).where(eq(links.id, id));

    return makeRight(null)
  }

  async getByUserSession(userSessionId: string): Promise<Either<never, GetLinksOutput>> {
    const linksList = await db.select().from(links).where(eq(links.userSessionId, userSessionId)).orderBy(desc(links.createdAt));

    return makeRight(linksList);
  }

  async getByShortUrl(shortUrl: string): Promise<Either<LinkNotFoundError, GetOriginalLinkOutput>> {
    const originalLink = await db.query.links.findFirst({
      where: eq(links.shortUrl, shortUrl),
    });

    if (!originalLink) {
      return makeLeft(new LinkNotFoundError('Link not found'));
    }

    return makeRight(originalLink);
  }

  async updateVisits(id: string): Promise<Either<never, void>> {
    await db.update(links).set({ visits: sql`visits + 1` }).where(eq(links.id, id))

    return makeRight(undefined);
  }
}
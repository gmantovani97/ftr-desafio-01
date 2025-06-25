import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas/links";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { LinkAlreadyExistsError } from "./errors/link-already-exists";

const createLinkInput = z.object({
  originalUrl: z.string().url(),
  shortUrl: z.string().url(),
  userSessionId: z.string().uuid(),
})

type CreateLinkInput = z.input<typeof createLinkInput>

export async function createLink(input: CreateLinkInput): Promise<Either<LinkAlreadyExistsError, null>> {
  const { originalUrl, shortUrl, userSessionId } = createLinkInput.parse(input)

  const linkExists = await db.select().from(links).where(eq(links.shortUrl, shortUrl)).limit(1);

  if (linkExists.length > 0) {
    return makeLeft(new LinkAlreadyExistsError())
  }

  await db.insert(links).values({
    originalUrl,
    shortUrl,
    userSessionId,
  })

  return makeRight(null)
}
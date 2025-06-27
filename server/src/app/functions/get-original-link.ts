import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas/links";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { eq } from "drizzle-orm";
import { LinkNotFoundError } from "./errors/link-not-found";

type GetOriginalLinkOutput = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  visits: number;
  createdAt: Date;
}

export async function getOriginalLink(shortUrl: string): Promise<Either<LinkNotFoundError, GetOriginalLinkOutput>> {
  const originalLink = await db.query.links.findFirst({
    where: eq(links.shortUrl, shortUrl),
  });

  if (!originalLink) {
    return makeLeft(new LinkNotFoundError('Link not found'));
  }

  return makeRight(originalLink);
}
import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas/links";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { eq } from "drizzle-orm";
import { LinkNotFoundError } from "./errors/link-not-found";

type GetOriginalLinkOutput = {
  originalUrl: string;
}

const BASE_URL = 'https://brev.ly/';

export async function getOriginalLink(shortUrl: string): Promise<Either<LinkNotFoundError, GetOriginalLinkOutput>> {
  const formattedShortUrl = `${BASE_URL}${shortUrl}`;

  const originalLink = await db.query.links.findFirst({
    where: eq(links.shortUrl, formattedShortUrl),
  });

  if (!originalLink) {
    return makeLeft(new LinkNotFoundError('Link not found'));
  }

  return makeRight({ originalUrl: originalLink.originalUrl });
}
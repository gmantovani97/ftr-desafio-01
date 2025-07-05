import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas/links";
import { Either, makeRight } from "@/shared/either";
import { desc, eq } from "drizzle-orm";

type GetLinksOutput = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  visits: number;
  createdAt: Date;
}[]

export async function getLinks(userSessionId: string): Promise<Either<never, GetLinksOutput>> {
  const linksList = await db.select().from(links).where(eq(links.userSessionId, userSessionId)).orderBy(desc(links.createdAt));

  return makeRight(linksList);
}
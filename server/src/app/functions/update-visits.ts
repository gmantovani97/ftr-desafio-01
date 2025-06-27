import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas/links";
import { Either, makeRight } from "@/shared/either";
import { eq, sql } from "drizzle-orm";

export async function updateVisits(id: string): Promise<Either<never, void>> {
  await db.update(links).set({ visits: sql`visits + 1` }).where(eq(links.id, id))

  return makeRight(undefined);
}
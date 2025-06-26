import { db } from "@/infra/db";
import { links } from "@/infra/db/schemas/links";
import { Either, makeRight } from "@/shared/either";
import { eq } from "drizzle-orm";
import { z } from "zod";

const deleteLinkInput = z.object({
  id: z.string().uuid(),
})

type DeleteLinkInput = z.input<typeof deleteLinkInput>

export async function deleteLink(input: DeleteLinkInput): Promise<Either<never, null>> {
  const { id } = deleteLinkInput.parse(input)

  await db.delete(links).where(eq(links.id, id));

  return makeRight(null)
}
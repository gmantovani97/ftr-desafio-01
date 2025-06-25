import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { randomUUID } from 'node:crypto'

export const links = pgTable('links', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  shortUrl: text('short_url').unique().notNull(),
  originalUrl: text('original_url').notNull(),
  visits: integer('visits').default(0).notNull(),
  userSessionId: text('user_session_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

import { sql } from 'drizzle-orm';
import { sqliteTable, int, text, real, index } from 'drizzle-orm/sqlite-core';

// TODO: add index for title
export const moviesTable = sqliteTable(
  'movies',
  {
    id: int().primaryKey({ autoIncrement: true }),
    kp_id: text().unique().notNull(),
    kp_type: text(),
    title: text().notNull(),
    original_title: text(),
    poster_url: text().notNull(),
    description: text(),
    short_description: text(),
    rating: real().notNull(),
    year: text().notNull(),
    seasons: text(),
    timestamp: text('timestamp')
      .notNull()
      .default(sql`(current_timestamp)`),
  },
  (t) => [
    index('kp_id').on(t.kp_id),
    index('title').on(t.title),
    index('original_title').on(t.original_title),
  ],
);

export type MovieType = typeof moviesTable;

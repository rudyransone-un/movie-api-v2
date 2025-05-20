import { sqliteTable, int, text, real } from 'drizzle-orm/sqlite-core';

// TODO: add index for title
export const moviesTable = sqliteTable('movies', {
  id: int().primaryKey({ autoIncrement: true }),
  kp_id: text().unique().notNull(),
  title: text().notNull(),
  poster_url: text().notNull(),
  description: text(),
  short_description: text(),
  rating: real().notNull(),
  year: text().notNull(),
});

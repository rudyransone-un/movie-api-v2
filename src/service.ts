import { SQLiteError } from 'bun:sqlite';
import { eq } from 'drizzle-orm';
import type { BunSQLiteDatabase } from 'drizzle-orm/bun-sqlite';

import { moviesTable } from './db/schema';
import type { MovieCreateType } from './dto/schema';

export class MoviesService {
  constructor(
    private readonly db: BunSQLiteDatabase<Record<string, never>> & {
      $client: any;
    },
  ) {}

  async getMany(limit: number = 10, skip: number = 0) {
    return this.db.select().from(moviesTable).limit(limit).offset(skip);
  }

  async create(dto: MovieCreateType) {
    try {
      const movie = await this.db.insert(moviesTable).values(dto).returning();

      return { movie: movie.shift(), error: null };
    } catch (e) {
      console.error(e);

      if (e instanceof SQLiteError) {
        const code = e.code;

        if (code === 'SQLITE_CONSTRAINT_UNIQUE') {
          return {
            movie: null,
            error: `Movies with kp_id=${dto.kp_id} already there!`,
          };
        }
      }

      throw e;
    }
  }

  async getById(id: number): Promise<any | null> {
    try {
      const movie = await this.db
        .select()
        .from(moviesTable)
        .where(eq(moviesTable.id, id));

      if (!movie.length) return null;

      return movie.shift();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

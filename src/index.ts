import { Hono, type Context, type Next } from 'hono';
import { logger } from 'hono/logger';
import { z, ZodObject } from 'zod/v4';

import { db } from './db';
import { MovieCreateSchema } from './dto/schema';
import { MoviesService } from './service';

z.config(z.locales.ru());

const moviesService = new MoviesService(db);

const app = new Hono();
app.use(logger());

function validateZodSchema(schema: ZodObject) {
  return async (c: Context, next: Next) => {
    const body = await c.req.json();

    const r = await schema.safeParseAsync(body);

    if (r.error) {
      const error = r.error?.issues;
      console.error(error);

      return c.json(error);
    }

    return next();
  };
}

app.post('/movies', validateZodSchema(MovieCreateSchema), async (c) => {
  const body = await c.req.json();

  try {
    const { movie, error } = await moviesService.create(body);

    if (error) return c.json({ error });

    return c.json({ data: movie });
  } catch (e) {
    return c.json({ status: 'fail' });
  }
});

app.get('/movies', async (c) => {
  const limit = c.req.query('limit')!;
  const skip = c.req.query('skip')!;

  const movies = await moviesService.getMany(parseInt(limit), parseInt(skip));

  return c.json({ data: movies, count: movies.length });
});

app.get('/movies/:id', async (c) => {
  const id = parseInt(c.req.param('id'));

  try {
    const movie = await moviesService.getById(id);

    return c.json({ data: movie });
  } catch (e) {
    return c.json({ status: 'fail' });
  }
});

export default app;

import { Hono, type Context, type Next } from 'hono';
import { z, ZodObject } from 'zod/v4';

import { db } from './db';
import { MovieCreateSchema } from './dto/schema';
import { MoviesService } from './service';

z.config(z.locales.ru());

const moviesService = new MoviesService(db);

const app = new Hono();

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
    const err = await moviesService.create(body);

    if (err) return c.json(err);

    return c.json({ status: 'ok' });
  } catch (e) {
    return c.json({ status: 'fail' });
  }
});

app.get('/movies', async (c) => {
  const movies = await moviesService.getMany();

  return c.json({ message: 'Hello, World!', movies });
});

app.get('/movies/:id', async (c) => {
  const id = parseInt(c.req.param('id'));

  try {
    const movie = await moviesService.getById(id);

    return c.json(movie);
  } catch (e) {
    return c.json({ status: 'fail' });
  }
});

export default app;

import { neon, neonConfig } from "@neondatabase/serverless";

// Local development against a Postgres behind a Neon-compatible HTTP proxy (optional).
if (process.env.NEON_FETCH_ENDPOINT) neonConfig.fetchEndpoint = process.env.NEON_FETCH_ENDPOINT;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Row = Record<string, any>;
export type Sql = (strings: TemplateStringsArray, ...values: unknown[]) => Promise<Row[]>;

let client: Sql | null = null;
let ready: Promise<void> | null = null;

export const dbConfigured = () => client !== null || Boolean(process.env.DATABASE_URL);

export function getSql(): Sql {
  if (client) return client;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  client = neon(url) as unknown as Sql;
  return client;
}

/** Test hook: lets a script run the data layer against any Postgres client. */
export function setSqlForTests(fn: Sql | null) {
  client = fn;
  ready = null;
}

/** Creates the tables on first use. Safe to run repeatedly. The same SQL lives in db/schema.sql. */
export function ensureSchema(): Promise<void> {
  if (!ready) {
    const sql = getSql();
    ready = (async () => {
      await sql`
        create table if not exists reviews (
          id uuid primary key,
          name text not null,
          rating smallint not null check (rating between 1 and 5),
          project_type text,
          body text not null,
          email text,
          status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
          ip_hash text,
          created_at timestamptz not null default now(),
          reviewed_at timestamptz
        )`;
      await sql`create index if not exists reviews_status_created on reviews (status, created_at desc)`;
      await sql`create index if not exists reviews_ip_created on reviews (ip_hash, created_at)`;
      await sql`
        create table if not exists review_reactions (
          review_id uuid not null references reviews(id) on delete cascade,
          kind text not null check (kind in ('helpful', 'love')),
          voter text not null,
          created_at timestamptz not null default now(),
          primary key (review_id, kind, voter)
        )`;
    })().catch((e) => {
      ready = null;
      throw e;
    });
  }
  return ready;
}

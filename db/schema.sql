-- Optional: run this in the Neon SQL editor. The app also creates these tables automatically on first use.

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
);

create index if not exists reviews_status_created on reviews (status, created_at desc);
create index if not exists reviews_ip_created on reviews (ip_hash, created_at);

create table if not exists review_reactions (
  review_id uuid not null references reviews(id) on delete cascade,
  kind text not null check (kind in ('helpful', 'love')),
  voter text not null,
  created_at timestamptz not null default now(),
  primary key (review_id, kind, voter)
);

create extension if not exists "uuid-ossp";

create type task_category as enum ('study','revision','sleep','meal','work','habit','break','exercise');
create type task_priority as enum ('low','medium','high','critical');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  exam_date timestamptz not null default make_timestamptz(extract(year from now())::int + 1, 6, 4, 9, 0, 0),
  xp integer not null default 0,
  level integer not null default 1,
  created_at timestamptz not null default now()
);

create table public.life_tasks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text not null default '',
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  priority task_priority not null default 'medium',
  category task_category not null default 'study',
  difficulty int not null check (difficulty between 1 and 5),
  focus_level int not null check (focus_level between 1 and 5),
  color text not null default '#00BFFF',
  reminder_minutes int[] not null default array[5,0],
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.focus_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  task_id uuid references public.life_tasks(id) on delete set null,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  focus_minutes int not null default 0,
  break_minutes int not null default 0,
  intensity int not null default 3 check (intensity between 1 and 5),
  allowed_websites text[] not null default '{}',
  ambient_sound text not null default 'space'
);

create table public.habit_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  habit text not null,
  logged_on date not null default current_date,
  score int not null default 1,
  unique(user_id, habit, logged_on)
);

create table public.push_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  endpoint text not null unique,
  subscription jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.life_tasks enable row level security;
alter table public.focus_sessions enable row level security;
alter table public.habit_logs enable row level security;
alter table public.push_subscriptions enable row level security;

create policy "profiles own rows" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "tasks own rows" on public.life_tasks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "focus own rows" on public.focus_sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "habits own rows" on public.habit_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "push own rows" on public.push_subscriptions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

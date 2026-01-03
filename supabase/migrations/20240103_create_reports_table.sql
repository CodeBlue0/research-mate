-- Create reports table
create table if not exists public.reports (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  subject text not null,
  career_interest text,
  step_1_content jsonb, -- Background Theory
  step_2_content jsonb, -- Curriculum Connection (Curriculum Map, Logic)
  step_3_content jsonb, -- Practical Activity
  step_4_content jsonb, -- Final Report Draft
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.reports enable row level security;

-- Create Policies
create policy "Users can view their own reports"
on public.reports for select
using (auth.uid() = user_id);

create policy "Users can insert their own reports"
on public.reports for insert
with check (auth.uid() = user_id);

create policy "Users can update their own reports"
on public.reports for update
using (auth.uid() = user_id);

create policy "Users can delete their own reports"
on public.reports for delete
using (auth.uid() = user_id);

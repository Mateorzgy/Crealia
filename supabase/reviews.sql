begin;
-- Run once in the SQL editor of a NEW Supabase project.
create schema if not exists crealia_reviews_private;
create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;
revoke all on schema crealia_reviews_private from public, anon, authenticated;

create table crealia_reviews_private.review_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
create table crealia_reviews_private.review_invitations (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique,
  project_name text not null check (length(project_name) between 1 and 120),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '30 days',
  used_at timestamptz,
  revoked_at timestamptz
);
create table crealia_reviews_private.customer_reviews (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null unique references crealia_reviews_private.review_invitations(id),
  author text not null check (length(author) between 2 and 80),
  business text not null default '' check (length(business) <= 100),
  rating integer not null check (rating between 1 and 5),
  body text not null check (length(body) <= 1200),
  consent boolean not null check (consent),
  status text not null default 'pending' check (status in ('pending','published','hidden')),
  submitted_at timestamptz not null default now()
);
alter table crealia_reviews_private.review_admins enable row level security;
alter table crealia_reviews_private.review_invitations enable row level security;
alter table crealia_reviews_private.customer_reviews enable row level security;
revoke all on all tables in schema crealia_reviews_private from public, anon, authenticated;

create function crealia_reviews_private.require_review_admin() returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not exists(select 1 from crealia_reviews_private.review_admins where user_id = auth.uid()) then
    raise exception 'Acceso no autorizado.' using errcode = '42501';
  end if;
end $$;
revoke all on function crealia_reviews_private.require_review_admin() from public, anon, authenticated;

create function public.create_review_invitation(project_name text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare raw_token text; invitation_id uuid;
begin
  perform crealia_reviews_private.require_review_admin();
  if project_name is null or length(trim(project_name)) not between 1 and 120 then raise exception 'Indicá el proyecto (hasta 120 caracteres).'; end if;
  raw_token := encode(extensions.gen_random_bytes(32),'hex');
  insert into crealia_reviews_private.review_invitations(token_hash,project_name)
  values(encode(extensions.digest(raw_token,'sha256'),'hex'),trim(project_name))
  returning id into invitation_id;
  return jsonb_build_object('id',invitation_id,'token',raw_token);
end $$;

create function public.review_invitation_state(token text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare inv crealia_reviews_private.review_invitations;
begin
  if token is null or token !~ '^[a-f0-9]{64}$' then return jsonb_build_object('valid',false); end if;
  select * into inv from crealia_reviews_private.review_invitations where token_hash=encode(extensions.digest(token,'sha256'),'hex');
  if not found or inv.revoked_at is not null or inv.used_at is not null or inv.expires_at<=now() then return jsonb_build_object('valid',false); end if;
  return jsonb_build_object('valid',true,'project',inv.project_name);
end $$;

create function public.submit_customer_review(token text, author text, business text, rating integer, body text, consent boolean)
returns jsonb language plpgsql security definer set search_path = '' as $
declare inv crealia_reviews_private.review_invitations;
begin
  if token is null or token !~ '^[a-f0-9]{64}create function public.list_published_reviews()
returns table(author text, business text, rating integer, text text)
language sql stable security definer set search_path = '' as $$
  select r.author,r.business,r.rating,r.body from crealia_reviews_private.customer_reviews r
  where r.status='published' and r.consent order by r.submitted_at desc limit 50;
$$;

create function public.review_admin_overview() returns jsonb
language plpgsql security definer set search_path = '' as $$
begin
  perform crealia_reviews_private.require_review_admin();
  return jsonb_build_object(
    'reviews',coalesce((select jsonb_agg(to_jsonb(r) - 'invitation_id') from (select * from crealia_reviews_private.customer_reviews order by submitted_at desc limit 200) r),'[]'::jsonb),
    'invitations',coalesce((select jsonb_agg(to_jsonb(i) - 'token_hash') from (select * from crealia_reviews_private.review_invitations order by created_at desc limit 100) i),'[]'::jsonb)
  );
end $$;

create function public.moderate_customer_review(review_id uuid, new_status text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform crealia_reviews_private.require_review_admin();
  if new_status is null or new_status not in ('published','hidden','pending') then raise exception 'Estado inválido.'; end if;
  update crealia_reviews_private.customer_reviews set status=new_status where id=review_id;
  if not found then raise exception 'Reseña no encontrada.'; end if;
end $$;
create function public.revoke_review_invitation(invitation_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform crealia_reviews_private.require_review_admin();
  update crealia_reviews_private.review_invitations set revoked_at=now() where id=invitation_id and used_at is null;
end $$;

revoke all on function public.create_review_invitation(text), public.review_invitation_state(text), public.submit_customer_review(text,text,text,integer,text,boolean), public.list_published_reviews(), public.review_admin_overview(), public.moderate_customer_review(uuid,text), public.revoke_review_invitation(uuid) from public,anon,authenticated;
grant execute on function public.review_invitation_state(text), public.submit_customer_review(text,text,text,integer,text,boolean), public.list_published_reviews() to anon,authenticated;
grant execute on function public.create_review_invitation(text), public.review_admin_overview(), public.moderate_customer_review(uuid,text), public.revoke_review_invitation(uuid) to authenticated;
-- After creating YOUR Auth user, add its UUID through the SQL editor:
-- insert into crealia_reviews_private.review_admins(user_id) values ('YOUR-AUTH-USER-UUID');

commit;
 then raise exception 'Invitación inválida o vencida.'; end if;
  if consent is distinct from true then raise exception 'Necesitamos tu autorización para publicar la reseña.'; end if;
  if author is null or length(trim(author)) not between 2 and 80 or length(coalesce(body,''))>1200 or rating is null or rating not between 1 and 5 or length(coalesce(business,''))>100 then
    raise exception 'Revisá el nombre, comentario y puntuación.';
  end if;
  select * into inv from crealia_reviews_private.review_invitations where token_hash=encode(extensions.digest(token,'sha256'),'hex') for update;
  if not found or inv.revoked_at is not null or inv.used_at is not null or inv.expires_at<=now() then raise exception 'Invitación inválida, vencida o ya utilizada.'; end if;
  insert into crealia_reviews_private.customer_reviews(invitation_id,author,business,rating,body,consent,status)
  values(inv.id,trim(author),trim(coalesce(business,'')),rating,trim(coalesce(body,'')),true,'pending');
  update crealia_reviews_private.review_invitations set used_at=now() where id=inv.id;
  return jsonb_build_object('published',false);
end $;

create function public.list_published_reviews()
returns table(author text, business text, rating integer, text text)
language sql stable security definer set search_path = '' as $$
  select r.author,r.business,r.rating,r.body from crealia_reviews_private.customer_reviews r
  where r.status='published' and r.consent order by r.submitted_at desc limit 50;
$$;

create function public.review_admin_overview() returns jsonb
language plpgsql security definer set search_path = '' as $$
begin
  perform crealia_reviews_private.require_review_admin();
  return jsonb_build_object(
    'reviews',coalesce((select jsonb_agg(to_jsonb(r) - 'invitation_id') from (select * from crealia_reviews_private.customer_reviews order by submitted_at desc limit 200) r),'[]'::jsonb),
    'invitations',coalesce((select jsonb_agg(to_jsonb(i) - 'token_hash') from (select * from crealia_reviews_private.review_invitations order by created_at desc limit 100) i),'[]'::jsonb)
  );
end $$;

create function public.moderate_customer_review(review_id uuid, new_status text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform crealia_reviews_private.require_review_admin();
  if new_status is null or new_status not in ('published','hidden','pending') then raise exception 'Estado inválido.'; end if;
  update crealia_reviews_private.customer_reviews set status=new_status where id=review_id;
  if not found then raise exception 'Reseña no encontrada.'; end if;
end $$;
create function public.revoke_review_invitation(invitation_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform crealia_reviews_private.require_review_admin();
  update crealia_reviews_private.review_invitations set revoked_at=now() where id=invitation_id and used_at is null;
end $$;

revoke all on function public.create_review_invitation(text), public.review_invitation_state(text), public.submit_customer_review(text,text,text,integer,text,boolean), public.list_published_reviews(), public.review_admin_overview(), public.moderate_customer_review(uuid,text), public.revoke_review_invitation(uuid) from public,anon,authenticated;
grant execute on function public.review_invitation_state(text), public.submit_customer_review(text,text,text,integer,text,boolean), public.list_published_reviews() to anon,authenticated;
grant execute on function public.create_review_invitation(text), public.review_admin_overview(), public.moderate_customer_review(uuid,text), public.revoke_review_invitation(uuid) to authenticated;
-- After creating YOUR Auth user, add its UUID through the SQL editor:
-- insert into crealia_reviews_private.review_admins(user_id) values ('YOUR-AUTH-USER-UUID');

commit;

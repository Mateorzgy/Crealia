begin;
alter table crealia_reviews_private.customer_reviews drop constraint if exists customer_reviews_body_check;
alter table crealia_reviews_private.customer_reviews add constraint customer_reviews_body_check check (length(body) <= 1200);

create or replace function public.submit_customer_review(token text, author text, business text, rating integer, body text, consent boolean)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare inv crealia_reviews_private.review_invitations;
begin
  if token is null or token !~ '^[a-f0-9]{64}$' then raise exception 'Invitación inválida o vencida.'; end if;
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
end $$;


commit;

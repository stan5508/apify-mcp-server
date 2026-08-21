# Cloud-accounts instellen (eenmalig, ~10 minuten)

Coachlog kan werken met echte accounts: klanten loggen zelf hun trainingen en voeding
op hun telefoon, en jij ziet dat binnenkomen. Daarvoor is één gratis dienst nodig die
de accounts en de gegevens bewaart: **Supabase**.

## 1. Project aanmaken

1. Ga naar <https://supabase.com> en maak een account (gratis).
2. Klik **New project**. Kies een naam (bijv. `coachlog`), een sterk databasewachtwoord
   (bewaar het, je hebt het verder niet nodig) en een regio in Europa.
3. Wacht tot het project klaar is (~2 minuten).

## 2. Tabellen en toegangsregels aanmaken

Open in Supabase de **SQL Editor** en plak onderstaande code in zijn geheel. Klik **Run**.

> **Draaide je dit al eerder?** Dan bestaan de meeste tabellen al en klaagt Supabase daarover.
> Voer in dat geval alleen de blokken uit die je nog mist — per tabel is dat de `create table`,
> de bijbehorende `alter table … enable row level security` en de twee `create policy`-regels:
>
> - `client_schemas` — jouw schema's bij de klant in de sporter-app (sinds versie 55)
> - `client_appointments` — jouw agenda-afspraken bij de klant (sinds versie 59)
> - `client_measurements` — de metingen die jij doet, bij de klant (sinds versie 61)
>
> Zonder die tabellen werkt de rest gewoon door; de klant ziet dat onderdeel dan alleen niet.

```sql
-- profielen: elke ingelogde gebruiker heeft er één
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  role text not null default 'client' check (role in ('coach', 'client')),
  name text not null default '',
  coach_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- uitnodigingscodes die de coach uitdeelt
create table public.invites (
  code text primary key,
  coach_id uuid not null references public.profiles(id) on delete cascade,
  label text not null default '',
  used_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- trainingen die de klant zelf logt
create table public.client_workouts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  date date not null,
  duration_min int,
  notes text default '',
  entries jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

-- maaltijden die de klant zelf logt
create table public.client_meals (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  date date not null,
  moment text not null default 'Snack',
  name text not null,
  amount numeric,
  kcal numeric default 0,
  protein numeric default 0,
  carbs numeric default 0,
  fat numeric default 0,
  updated_at timestamptz not null default now()
);

-- schema's die de coach voor de klant klaarzet
create table public.client_schemas (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  coach_id uuid not null references public.profiles(id) on delete cascade,
  name text not null default '',
  day_order int not null default 0,
  exercises jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

-- afspraken die de coach met de klant heeft staan
create table public.client_appointments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  coach_id uuid not null references public.profiles(id) on delete cascade,
  date date not null,
  time text not null default '',
  duration_min int,
  status text not null default 'gepland',
  note text not null default '',
  updated_at timestamptz not null default now()
);

-- metingen die de coach doet en naar de klant doorzet
create table public.client_measurements (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  coach_id uuid not null references public.profiles(id) on delete cascade,
  date date not null,
  weight numeric, fat numeric, muscle numeric,
  waist numeric, chest numeric, hip numeric, arm numeric, leg numeric,
  height numeric,
  updated_at timestamptz not null default now()
);

-- water per dag
create table public.client_water (
  client_id uuid not null references public.profiles(id) on delete cascade,
  date date not null,
  ml int not null default 0,
  primary key (client_id, date)
);

alter table public.profiles enable row level security;
alter table public.invites enable row level security;
alter table public.client_workouts enable row level security;
alter table public.client_meals enable row level security;
alter table public.client_schemas enable row level security;
alter table public.client_appointments enable row level security;
alter table public.client_measurements enable row level security;
alter table public.client_water enable row level security;

-- profielen: jezelf lezen/bijwerken, en als coach je eigen klanten lezen
create policy "eigen profiel lezen" on public.profiles
  for select using (id = auth.uid() or coach_id = auth.uid());
create policy "eigen profiel aanmaken" on public.profiles
  for insert with check (id = auth.uid());
create policy "eigen profiel bijwerken" on public.profiles
  for update using (id = auth.uid());

-- uitnodigingen: alleen de coach beheert de zijne
create policy "eigen uitnodigingen" on public.invites
  for all using (coach_id = auth.uid()) with check (coach_id = auth.uid());

-- trainingen: de klant beheert de eigen rijen, de coach leest die van zijn klanten
create policy "klant beheert eigen trainingen" on public.client_workouts
  for all using (client_id = auth.uid()) with check (client_id = auth.uid());
create policy "coach leest trainingen van klanten" on public.client_workouts
  for select using (exists (
    select 1 from public.profiles p where p.id = client_workouts.client_id and p.coach_id = auth.uid()
  ));

create policy "klant beheert eigen maaltijden" on public.client_meals
  for all using (client_id = auth.uid()) with check (client_id = auth.uid());
create policy "coach leest maaltijden van klanten" on public.client_meals
  for select using (exists (
    select 1 from public.profiles p where p.id = client_meals.client_id and p.coach_id = auth.uid()
  ));

-- schema's: de coach schrijft ze, de klant leest alleen de zijne
create policy "klant leest eigen schema's" on public.client_schemas
  for select using (client_id = auth.uid());
create policy "coach beheert schema's van klanten" on public.client_schemas
  for all using (exists (
    select 1 from public.profiles p where p.id = client_schemas.client_id and p.coach_id = auth.uid()
  )) with check (exists (
    select 1 from public.profiles p where p.id = client_schemas.client_id and p.coach_id = auth.uid()
  ));

-- afspraken: de coach beheert ze, de klant leest alleen de zijne
create policy "klant leest eigen afspraken" on public.client_appointments
  for select using (client_id = auth.uid());
create policy "coach beheert afspraken van klanten" on public.client_appointments
  for all using (exists (
    select 1 from public.profiles p where p.id = client_appointments.client_id and p.coach_id = auth.uid()
  )) with check (exists (
    select 1 from public.profiles p where p.id = client_appointments.client_id and p.coach_id = auth.uid()
  ));

-- metingen: de coach beheert ze, de klant leest alleen de zijne
create policy "klant leest eigen metingen" on public.client_measurements
  for select using (client_id = auth.uid());
create policy "coach beheert metingen van klanten" on public.client_measurements
  for all using (exists (
    select 1 from public.profiles p where p.id = client_measurements.client_id and p.coach_id = auth.uid()
  )) with check (exists (
    select 1 from public.profiles p where p.id = client_measurements.client_id and p.coach_id = auth.uid()
  ));

create policy "klant beheert eigen water" on public.client_water
  for all using (client_id = auth.uid()) with check (client_id = auth.uid());
create policy "coach leest water van klanten" on public.client_water
  for select using (exists (
    select 1 from public.profiles p where p.id = client_water.client_id and p.coach_id = auth.uid()
  ));

-- een code inwisselen koppelt de klant aan de coach
create or replace function public.redeem_invite(p_code text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare v_coach uuid;
begin
  select coach_id into v_coach from invites where code = p_code and used_by is null;
  if v_coach is null then
    raise exception 'Code onbekend of al gebruikt';
  end if;
  update profiles set coach_id = v_coach, role = 'client' where id = auth.uid();
  update invites set used_by = auth.uid() where code = p_code;
end;
$$;

grant execute on function public.redeem_invite(text) to authenticated;
```

## 3. Inloglinks laten werken

Ga naar **Authentication → URL Configuration** en zet:

- **Site URL**: `https://stan5508.github.io/apify-mcp-server/`
- **Redirect URLs**: voeg toe:
  - `https://stan5508.github.io/apify-mcp-server/`
  - `https://stan5508.github.io/apify-mcp-server/sporter.html`

## 4. De twee waarden in de app zetten

Ga in Supabase naar **Project Settings → API** en kopieer:

- **Project URL** (bijv. `https://abcdefgh.supabase.co`)
- **anon public** sleutel (een lange tekst)

Staat er `/rest/v1` achter de URL, dan is dat geen probleem: de app haalt dat er zelf af.

Open in Coachlog de zijbalk → **Instellingen**, blok "Cloud-accounts" (of ga rechtstreeks
naar `https://stan5508.github.io/apify-mcp-server/#/cloud`). Plak beide waarden en klik
**Verbinden**. Log daarna in met je e-mailadres; je krijgt een inloglink toegestuurd.

Zie je Cloud-accounts nergens staan? Dan draait je tablet nog een oude versie. Onderaan
Vandaag staat het versienummer; dat moet 25 of hoger zijn. Sluit de app helemaal af, open
hem opnieuw met internet, en ververs.

De anon-sleutel is bedoeld om openbaar te zijn: wie wat mag zien wordt bepaald door de
toegangsregels hierboven, niet door de sleutel.

## 5. Klanten uitnodigen

1. Maak in Coachlog onder **Instellingen → Cloud-accounts** een uitnodigingscode per klant.
2. Stuur je klant de link `https://stan5508.github.io/apify-mcp-server/sporter.html`
   en de code.
3. De klant logt in met het eigen e-mailadres, vult de code één keer in, en is aan jou
   gekoppeld. Vanaf dan verschijnen zijn trainingen en voeding bij jou onder
   **Van klanten**.

## 6. Contracten automatisch mailen (optioneel, ~15 minuten)

Zonder dit blok maakt Coachlog het contract als PDF en geef je het zelf door via het
deelvenster van je tablet. Met dit blok verstuurt de app zelf, met de PDF als bijlage.

Er zijn twee dingen nodig: een maildienst die de mail bezorgt, en een klein functietje in
je Supabase-project dat de sleutel van die maildienst geheim houdt.

### 6a. Maildienst

1. Maak een gratis account op <https://resend.com> (3.000 mails per maand gratis).
2. **Domains → Add domain**: vul je eigen domein in en zet de DNS-regels die Resend
   toont bij je domeinprovider. Dit is nodig zodat je mail niet als spam aankomt.
   Heb je geen domein, dan kun je eerst testen met de afzender `onboarding@resend.dev`;
   daarmee kun je alleen naar je eigen adres mailen.
3. **API Keys → Create API Key**, rechten *Sending access*. Kopieer de sleutel; je ziet
   hem maar één keer.

### 6b. Functie in Supabase

1. Ga in Supabase naar **Edge Functions → Deploy a new function → Via editor**.
2. Noem de functie exact `send-contract`.
3. Plak de inhoud van [`supabase/functions/send-contract/index.ts`](./supabase/functions/send-contract/index.ts)
   en klik **Deploy**.
4. Ga naar **Edge Functions → Secrets** en voeg twee waarden toe:

   | Naam             | Waarde                                          |
   | ---------------- | ----------------------------------------------- |
   | `RESEND_API_KEY` | de sleutel uit stap 6a                          |
   | `MAIL_FROM`      | `Coachlog <contract@jouwdomein.nl>`             |

### 6c. Uitproberen

In Coachlog: **Instellingen → Contracten mailen → Testmail sturen**. Die stuurt een kort
bericht naar je eigen adres. Komt hij aan, dan staat het goed.

Vanaf dan heeft elk getekend contract een knop **Mailen naar klant**. De klant krijgt de
PDF als bijlage; met "Kopie naar mijzelf" aan krijg je zelf een blinde kopie, en antwoorden
van de klant komen bij jou terecht.

Alleen jouw coach-account kan de functie gebruiken: Supabase controleert de inlog en de
functie kijkt daarna of het profiel de rol *coach* heeft. Klantaccounts kunnen er dus geen
mail mee versturen.

## Wat klanten wel en niet zien

Klanten zien alleen hun eigen gegevens: hun trainingen, hun voeding, en de schema's die jij
voor hén hebt klaargezet met **Van klanten → Klaarzetten**. Ze zien niets van andere klanten,
en verder niets uit jouw administratie (tegoeden, betalingen, contracten). Dat wordt afgedwongen
door de databaseregels, niet door de app — ook wie de app zou omzeilen komt er niet bij.

# Stap 1b — Directe concurrentieset Ashcroft London

Correctie op [01-fashion-uk-competitor-scan.md](./01-fashion-uk-competitor-scan.md).

## Waarom dit document bestaat

De eerste scan ging uit van "fashion e-commerce UK" in het algemeen. Na het uitlezen van de
bestaande CBO-pipeline (`routines/cbo-kill/SPEC.md`) en de Shopify-store blijkt de werkelijke
context veel specifieker:

| | |
|---|---|
| Store | **Ashcroft London** — `ashcroftlondon.co.uk` (`smayip-je.myshopify.com`) |
| Valuta / markt | GBP, adaccount Europe/London |
| Assortiment | Dameskleding: maxi/mini-jurken, blouses, boho, sets, orthopedische sandalen |
| Prijspunt | £33,71 – £69,90 (verkochte producten, laatste 60 dagen) |
| Campagnestructuur | `ASH \| <productnaam> \| CBO` — één CBO per product |
| Budgetladder | €50 → €70 → €100 → €150 |
| Kill-momenten | €10 / €20 / €30 cumulatieve spend |
| Stadium | Vroeg: 8 orders / £301 gross sales over 60 dagen |

Nobody's Child (4.8M bezoekers/maand) en Represent zijn dus **geen** concurrenten — dat zijn
merken in een andere fase met andere economics. De relevante set is: **UK-adverteerders die
losse damesjurken van £30–£95 op productpagina's verkopen via Meta**. Dat is precies de vorm
die de CBO-pipeline draait.

Onderstaande scan is daarop gefilterd (niche Clothing, GB, productpagina's, £30–£95,
gesorteerd op EU ad spend laatste 30 dagen).

---

## 1. De directe concurrentieset

| Merk | Domein | Prijs | Ads op page | 30d EU spend (top-ad) |
|------|--------|-------|-------------|----------------------|
| **This is Unfolded** | thisisunfolded.com | £55–74 | 616 | €11.6k + €11.5k + €10.4k + €10.2k … |
| **Ever-Pretty UK** | ever-pretty.co.uk | £57.99 | 1291 | €9.9k |
| **Pink Boutique** | pinkboutique.co.uk | £31.99–37.99 | 221 | €11.7k / €9.7k |
| **AX Paris** | axparis.com | £45–55 | 1797 | €8.3k / €5.3k |
| **Damson Madder** | damsonmadder.com | £44 | 425 | €8.2k |
| **Killstar** | killstar.com | £65 | 1928 | €6.2k |
| **Mars The Label** | marsthelabel.com | £68 | 798 | €6.1k |
| **Oh Polly** | ohpolly.com | £75 | 1160 | €5.7k |
| **Gagichic** | (5c8dc9-5.myshopify.com) | £46 | **1** | €5.7k |

---

## 2. This is Unfolded — de belangrijkste vondst

Zes van de twintig hoogst-spendende ads in dit segment komen van één merk, met **exact dezelfde
copy**. Ranks 4, 5, 7, 8, 10 en 11 binnen hun eigen account draaien allemaal dit blok:

> *"Hate fast fashion? Care about how your clothes are made... Then it's time to meet Unfolded! 🤫
> At Unfolded we make clothes without the waste and do good with the savings, why? 🤔
> Well, this year 30 billion items of clothing will be made and never sold! There has to be a
> better way... for the planet, your pocket and the people who make our clothes! 🌍🌱"*

Wat ze doen, en waarom het werkt:

1. **Eén angle, veel producten.** De body-copy noemt het product niet. Hetzelfde tekstblok draait
   onder £55- én £74-producten. De creative en de landingspagina variëren, de boodschap niet.
   Dit is de goedkoopst mogelijke manier om een CBO met veel creatives te vullen.
2. **Het product staat in de caption, niet in de copy.** "Is this the perfect dress?" /
   "Our nicest ever dress?!?" — een vraag, geen bewering. De vraag doet het klikwerk.
3. **Een oplopende social-proof-ladder in de description:** `Loved by 75,000+ Women` →
   `85,000+` → `100,000+`, en als caption-variant: *"100,000 women can't be wrong can they?"*
   Ze testen het getal als variabele. Dat is een testbare as die niets kost.
4. **Nul korting.** Geen sale, geen BOGO, geen urgentie. De hele hefboom is een vijand
   (fast fashion) + een missie + sociaal bewijs.

**Dit is het meest kopieerbare model voor Ashcroft**, omdat het niet afhangt van marge-opoffering
of van een uniek product — alleen van een scherp geformuleerde positie.

---

## 3. De vijf angle-families in dit segment

Uit de copy van bovenstaande adverteerders, met de best-spendende uitvoering per familie:

| # | Familie | Uitvoering | Mechaniek |
|---|---------|-----------|-----------|
| 1 | **Vijand + missie** | Unfolded: "Hate fast fashion?" | Identiteit vóór product. Werkt zonder korting, draagt £74. |
| 2 | **Gelegenheid-specifiek** | Ever-Pretty: *"Perfect for Country Weddings, Garden Soirées 🌸… a Cotswolds bash or a Yorkshire wedding"* | Hyper-lokale gelegenheid maakt de jurk concreet. + code `SAVE20` boven £200. |
| 3 | **Catalogus/nieuw-binnen** | AX Paris: *"New In! Shop our Chocolate Polka Dot Print Puff Sleeve Midi Dress"* | Puur productnaam, 1797 ads. Volume-model, geen boodschap. |
| 4 | **Identiteit/subcultuur** | Killstar: *"Our soul belongs to exploring old, cursed palaces 🏰 … BEATRIX DRESS is back in stock 📸 @anna.in.seasons"* | Wereldbeeld + terug-op-voorraad + UGC-credit als bewijs. |
| 5 | **Iteratie op een winnaar** | Mars The Label: *"The tie front mini you LOVED got an upgrade — now reimagined as a chocolate maxi"* | Bouwt voort op bestaand succes. Vereist een bewezen vorige winner. |

Urgentie in dit segment zit bijna volledig in de **caption**, niet in de body:
"Hot right now! 🔥", "Selling Fast🔥" (Pink Boutique), "Flash Sale" (Ever-Pretty),
"back in stock" (Killstar). De body-copy blijft schoon.

---

## 4. Wat dit betekent voor de CBO-routine

De kill-routine beslist wanneer een CBO uit moet. De ontbrekende helft is **wat er in gaat**.
Deze scan levert daar drie concrete regels voor:

1. **Angle is de testvariabele, niet het product.** Ashcroft draait nu één CBO per product
   (`ASH | <product> | CBO`). Unfolded laat zien dat één angle over meerdere producten heen
   schaalt. Overweeg een tweede as: dezelfde jurk onder 3–5 angles uit §3, in plaats van
   5 jurken onder 1 generieke angle.
2. **De £10/£20/£30-kill straft dure angles onterecht af.** De vijand+missie-angle heeft langere
   copy en een tragere klik-naar-koop-route dan een "New In"-catalogus-ad. Bij een kill op €10
   spend met CPC > €1 sneuvelt precies het type ad dat bij Unfolded £74-producten draagt.
   Dit is een spanning die expliciet gemaakt moet worden voordat de routine gekoppeld wordt.
3. **Geen enkele top-spender in dit segment leunt op korting**, op Ever-Pretty na — en die zet
   de drempel op £200, ver boven Ashcrofts AOV. Korting als hoofdhefboom is bij een AOV van
   £35–70 niet wat de markt doet.

---

## 5. Aangepaste shortlist voor stap 2

De acht uit het eerste document vervangen door zes die daadwerkelijk in Ashcrofts vijver vissen:

| # | Merk | Wat we eruit halen |
|---|------|-------------------|
| 1 | **This is Unfolded** | Volledige teardown. Eén-angle-schaalmodel, social-proof-ladder, geen korting, £55–74 |
| 2 | **Ever-Pretty UK** | Gelegenheid-matrix (bruiloft/gast/bruidsmeisje) en de kortingsdrempel |
| 3 | **Pink Boutique** | Caption-urgentie zonder body-urgentie, £32–38 prijspunt |
| 4 | **Damson Madder** | £44 boho/print — dichtst bij Ashcrofts eigen stijl |
| 5 | **Killstar** | Identiteitsmerk met UGC-bewijs; 1928 ads |
| 6 | **Mars The Label** | Iteratiemodel op bewezen winnaars — direct bruikbaar zodra Ashcroft één winner heeft |

Per merk vullen we het raamwerk uit §6 van het eerste document in, met één toevoeging:
**welke angle-familie draagt de spend, en hoeveel creatives per angle**. Dat is de directe
input voor de CBO-kant.

---

## 6. Voorbehoud

Ashcroft staat op 8 orders in 60 dagen. De merken hierboven draaien £5k+/dag. Het verschil is
niet te overbruggen door de ads te kopiëren — hun spend koopt data die Ashcroft nog niet heeft.
Wat wél overdraagbaar is: de **angle-structuur**, de **caption/body-taakverdeling** en de
**social-proof-mechaniek**. Dat zijn de drie dingen waar stap 2 op moet focussen.

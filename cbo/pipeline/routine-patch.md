# Promptwijziging voor `Dagelijkse CBO-pipeline`

Routine: `trig_018QRfi1xAn8Y3pVVCqjspG1` — https://claude.ai/code/routines/trig_018QRfi1xAn8Y3pVVCqjspG1

**Nog niet toegepast.** Dit document beschrijft precies wat er moet wijzigen; het doorvoeren is
een aparte, bewuste handeling.

---

## Het probleem in één zin

De repo is als `source` aan de routine gekoppeld, maar **de prompt leest er geen enkel bestand
uit** — dus alles wat we in `cbo/pipeline/` schrijven is voor de routine onzichtbaar.

Ter vergelijking: `CBO dagrapport 01:05` heeft wél een leesstap (STAP 1), en die faalt momenteel
omdat de bestanden alleen op een ongemergede branch staan. Deze routine heeft niet eens die stap.

---

## Wijziging 1 — de leesstap (dit opent het kanaal)

Voeg toe **vóór** de huidige `STAP 1 - RAPPORT LEZEN`, en hernummer de rest:

```
STAP 0 - PLAYBOOK LEZEN. Lees cbo/pipeline/playbook.md uit de gekoppelde repository.
Pas ALLEEN de regels toe die in paragraaf 1 (Actieve regels) staan. Paragraaf 2 (Kandidaten)
is een wachtkamer en verandert je gedrag niet — negeer die volledig, ook als een kandidaat
overtuigend klinkt. Is paragraaf 1 leeg, werk dan exact volgens de instructies hieronder.
Kun je het bestand niet vinden, meld dat in de reviewmail van de laatste stap en ga gewoon
door; het ontbreken van het playbook mag de pipeline nooit blokkeren.
```

Drie dingen zijn hier bewust zo geformuleerd:

- **"negeer die volledig, ook als een kandidaat overtuigend klinkt"** — zonder die zin gaat een
  capabel model de kandidaten alsnog meewegen. Ze staan er immers, en ze klinken redelijk. Dat is
  precies wat `learning-loop-design.md` §7 verbiedt.
- **"meld dat en ga gewoon door"** — een ontbrekend playbook mag nooit 3 producten kosten. Vergelijk
  met `CBO dagrapport`, die zijn SPECs niet vond en terecht doorging.
- **Expliciet "uit de gekoppelde repository"** — anders gaat de routine in Drive of lokaal zoeken,
  zoals de dagrapport-routine deed (*"niet lokaal, niet op Drive"*).

## Wijziging 2 — de angle-code in de campagnenaam

In `STAP 3 (g)`, alleen doorvoeren **samen met** een mechanisme dat een angle kiest. Zie
[`campaign-naming.md`](./campaign-naming.md).

Nu:

```
create_campaign met naam ASH | [Product] | CBO | [d-m-jjjj]
```

Wordt:

```
create_campaign met naam ASH | [Product] | CBO | [d-m-jjjj] | [angle-code]
```

**Doe dit nog niet.** Zolang de pipeline geen angles uit `angle-library-v1.md` kiest, is er niets
zinnigs voor dat segment. Een altijd-gelijke of verzonnen code is schadelijker dan geen code: hij
suggereert een meting die er niet is, en `cbo-leren` zou er scores op gaan baseren.

---

## Volgorde

| # | Stap | Blokkeert wat |
|---|---|---|
| 1 | `cbo/pipeline/` op **master** krijgen | Alles. De routine kloont de default branch. |
| 2 | Wijziging 1 doorvoeren | Alle toekomstige kennis |
| 3 | Verifiëren met een handmatige run dat STAP 0 het bestand vindt | — |
| 4 | Angle-keuze + wijziging 2 | De lerende lus kan pas meten als angles toewijsbaar zijn |

Stap 1 is niet optioneel en wordt makkelijk vergeten. De routine haalt `master`; `cbo/` en
`routines/` staan daar vandaag geen van beide op. Dat is bewezen: de dagrapport-routine meldde
op 2026-08-23 dat de SPEC-bestanden nergens te vinden waren.

---

## Twee dingen die losstaan van dit alles

**De routine staat op Paused** en `next_run_at` staat nog op 2026-08-05. Hij draait dus al ruim
twee weken niet. Kennis toevoegen aan een stilstaande routine verandert voorlopig niets aan de
campagnes.

**De dagrapport-run van 2026-08-23 duurde 21.784 seconden** — ruim zes uur — voor werk van
minuten, met tientallen `permission prompt ... requires your approval` in het log op de
Zapier-connector. Dat staat los van kennis, maar het raakt wel elke routine die diezelfde
connector gebruikt, inclusief deze.

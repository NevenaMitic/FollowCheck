# Nepratilac

Web aplikacija za analizu Instagram followers/following podataka na osnovu
zvaničnog Instagram Data Export ZIP fajla. Sva obrada podataka dešava se
lokalno u browseru — fajl se nikad ne šalje na server niti se čuva u bazi.

## Funkcionalnosti

- Uputstvo (sa slotovima za screenshot-ove) kako preuzeti Data Export sa Instagrama
- Drag & drop upload ZIP fajla
- Lokalni parser (`src/lib/instagram-parser.ts`) koji čita `followers_and_following`
  JSON fajlove direktno iz ZIP-a preko `jszip`, bez slanja na server
- Ekran obrade sa terminal-like logom koji prati stvarni napredak parsiranja
- Dashboard rezultata: ukupno followers/following, mutual, "ne prate te nazad",
  "ti ne pratiš njih nazad" — sa pretragom i sortiranjem
- Srpski i engleski jezik (prebacivanje u letu, pamti izbor)
- Light / Dark / System tema
- Footer sa privacy izjavom i linkom na izvorni kod

## Pokretanje

```bash
npm install
npm run dev
```

Otvori [http://localhost:3000](http://localhost:3000).

Za produkcioni build:

```bash
npm run build
npm run start
```

## Fontovi

Projekat je pripremljen za `next/font/google` (Space Grotesk / Inter / IBM
Plex Mono), ali je trenutno prebačen na sistemske font-stack-ove jer sandbox
u kom je razvijan nije imao pristup fonts.googleapis.com. Da vratiš prave
fontove, u `src/app/layout.tsx` dodaj:

```tsx
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});
const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"] });
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
});
```

i dodaj `${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}` u
`className` na `<body>`, zatim u `src/app/globals.css` vrati:

```css
--font-display: var(--font-space-grotesk);
--font-body: var(--font-inter);
--font-mono: var(--font-plex-mono);
```

## Screenshot-ovi za uputstvo

`src/components/wizard/export-guide.tsx` trenutno prikazuje placeholder
"slotove" za screenshot-ove umesto pravih slika. Da ih zameniš:

1. Ubaci slike u `public/guide/` (npr. `step-1.png` … `step-5.png`)
2. U `ScreenshotSlot` komponenti zameni placeholder sa `<Image src={...} />`

## Arhitektura

```
src/
  app/                     # Next.js App Router (layout, globals.css, page.tsx)
  components/
    header.tsx, footer.tsx
    theme-toggle.tsx, lang-toggle.tsx, local-only-badge.tsx
    landing/                # Hero, 4-koraka pregled, animirani "scan" panel
    wizard/
      export-guide.tsx      # Korak 1: uputstvo za export
      upload-step.tsx        # Korak 2: drag & drop upload
      processing-step.tsx    # Korak 3: lokalna obrada + terminal log
      results/                # Korak 4: dashboard rezultata
  lib/
    instagram-parser.ts     # Čitav parser — jedino mesto koje dira ZIP
    i18n/                    # Rečnici (sr/en) + kontekst
```

## Privatnost

- Nema Instagram login-a, lozinke ni API pristupa nalogu
- ZIP se nikad ne šalje na mrežu — cela obrada je u `instagram-parser.ts`,
  koji radi isključivo sa `File` objektom u browseru
- Nema baze podataka; ništa se ne perzistira osim jezika/teme (localStorage)

Nezavisan projekat, nije povezan sa Instagram/Meta Inc.

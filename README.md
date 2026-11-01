# English Adventure

Spletna aplikacija za učenje angleščine, namenjena učencem **2. in 3. razreda osnovne šole**.

Otroci skozi kratke mini-igre spoznavajo osnovne angleške besede in preproste povedi. Teme so razporejene kot pustolovščina na zemljevidu: Animals → Colours → Food → Family → School → Numbers. Ko otrok zaključi vse igre ene teme, se odklene naslednja. Za uspešno rešene igre zbira zvezdice, za zaključene teme pa značke. Skozi igre ga spremlja maskota, sova Ollie, ki ga po vsakem odgovoru pohvali ali spodbudi.

Navodila v aplikaciji so v slovenščini, besede in povedi, ki se jih otrok uči, pa v angleščini.

## Funkcionalnosti

- **Izbira razreda** – na začetnem zaslonu otrok izbere 2. ali 3. razred. Izbira se shrani, besede in povedi v igrah pa so prilagojene izbranemu razredu.
- **Pet mini-iger pri vsaki temi** – What is this?, Listen and choose, Match the pairs, Build a sentence in Say it.
- **Zvezdice** – po vsaki igri otrok dobi od 0 do 3 zvezdice glede na delež pravilnih odgovorov (vsaj 90 % = 3 zvezdice, vsaj 60 % = 2, vsaj en pravilen odgovor = 1). Shrani se najboljši rezultat posamezne igre.
- **Ponovni poskus** – pri napačnem odgovoru lahko otrok poskusi znova. Kot pravilen se šteje le odgovor, ki je pravilen v prvem poskusu, zato ponavljanje ne prinese dodatnih zvezdic.
- **Postopno odklepanje tem** – prva tema je vedno odprta, vsaka naslednja se odklene, ko so vse igre prejšnje teme zaključene z vsaj eno zvezdico. Zaklenjene teme ni mogoče odpreti niti z ročnim vnosom naslova.
- **Značke** – za vsako zaključeno temo otrok prejme značko (npr. *Prijatelj živali*, *Mojster barv*). Značke so prikazane na zemljevidu tem.
- **Shranjevanje napredka** – zvezdice se shranjujejo v brskalnik (`localStorage`), **ločeno za vsak razred**, in ostanejo shranjene tudi po osvežitvi strani.
- **Zvok in izgovorjava** – angleške besede izgovori brskalnik (Web Speech API, `speechSynthesis`), pravilne in napačne odgovore pa spremljajo zvočni učinki.
- **Navigacija** – gumbi *Domov*, *Zemljevid*, *Igraj znova* in *Naslednja igra* na zaslonu z rezultatom.
- **Prilagodljiv prikaz** – aplikacija deluje na računalniku, tablici in telefonu.

## Učne teme

| Tema | Slovensko | Število besed |
|---|---|---|
| Animals | Živali | 10 |
| Colours | Barve | 10 |
| Food | Hrana | 10 |
| Family | Družina | 8 |
| School | Šola | 10 |
| Numbers | Števila | 10 |

Nekatere besede so namenjene samo 3. razredu. Vsaka beseda ima svojo ilustracijo (SVG), ki je bila izdelana posebej za ta projekt (glej [`public/images/README.md`](public/images/README.md)).

## Mini-igre

| Mini-igra | Opis |
|---|---|
| **What is this?** | Prikaže se slika, otrok med štirimi angleškimi besedami izbere pravo. Po pravilnem odgovoru aplikacija besedo izgovori. Igra ima do 10 vprašanj. |
| **Listen and choose** | Aplikacija izgovori besedo, otrok med tremi slikami izbere pravo. Besedo lahko posluša večkrat. Igra ima do 8 vprašanj. |
| **Match the pairs** | Otrok najprej klikne sliko, nato pravo besedo, in tako poveže štiri pare. |
| **Build a sentence** | Otrok iz premešanih besed sestavi angleško poved (6 povedi na temo in razred). Če je za poved več pravilnih vrstnih redov (npr. *cats and dogs* / *dogs and cats*), so sprejeti vsi navedeni. |
| **Say it** | Otrok vidi sliko in besedo ter jo izgovori v mikrofon. Aplikacija govor prepozna in preveri, ali je beseda pravilna. Besedo lahko tudi preskoči. Igra ima do 10 besed. |

**Opomba za Say it:** prepoznavanje govora (Web Speech API, `SpeechRecognition`) podpirajo Google Chrome, Microsoft Edge in Safari, Firefox pa ne. Brskalnik mora imeti dovoljenje za uporabo mikrofona, Chrome in Edge pa za prepoznavanje potrebujeta internetno povezavo.

## Tehnologije

| Tehnologija | Namen |
|---|---|
| React 19 | izdelava uporabniškega vmesnika s komponentami |
| TypeScript | JavaScript s tipi, manj napak v kodi |
| Vite | razvojni strežnik in izdelava produkcijske različice |
| CSS | oblikovanje aplikacije (brez dodatnih knjižnic) |
| Web Speech API | izgovorjava besed (`speechSynthesis`) in prepoznavanje govora (`SpeechRecognition`) |
| Web Audio API | predvajanje zvočnih učinkov |
| localStorage | shranjevanje razreda in napredka v brskalniku |
| ESLint | preverjanje kakovosti kode |
| Google Fonts | pisavi Fredoka in Nunito |
| GitHub | shranjevanje kode in Kanban tabla |

Aplikacija ne potrebuje strežnika, podatkovne baze ali zunanjih API ključev. Za usmerjanje med stranmi uporablja preprosto usmerjanje z `#` v naslovu (npr. `#/topics/animals/say-it`), zato ne potrebuje dodatne knjižnice.

## Namestitev in zagon

Potrebujete [Node.js](https://nodejs.org/) (priporočena je zadnja LTS različica) in npm.

```bash
# namestitev odvisnosti
npm install

# zagon razvojnega strežnika
npm run dev
```

Aplikacija se odpre na naslovu, ki ga izpiše Vite (privzeto `http://localhost:5173`).

Ostali ukazi:

```bash
npm run build     # preverjanje tipov (TypeScript) in izdelava produkcijske različice v mapo dist/
npm run preview   # lokalni ogled produkcijske različice
npm run lint      # preverjanje kode z ESLint
```

## Ekipa

Skupina **LINS**:

- Lejla Gutić
- Nejra Gutić
- Ivana Ilić
- Slađana Petrović

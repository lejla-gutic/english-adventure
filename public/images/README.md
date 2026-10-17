# Vocabulary illustrations

Illustrations for the vocabulary in `src/data/vocabulary/`, one SVG per word:

```
public/images/<topic>/<word>.svg     e.g. animals/dog.svg, school/school-bag.svg
```

The file name is the English word in lower case with spaces replaced by `-`
(`school bag` → `school-bag.svg`). Exceptions are set with `slug` in the topic
file (`mum / mother` → `mum.svg`, `dad / father` → `dad.svg`).

| Folder      | Files | Notes |
|-------------|-------|-------|
| `animals/`  | 10    | all words from the list |
| `colours/`  | 10    | paint splash in the colour (`white.svg` has a light outline) |
| `food/`     | 10    | `food/orange.svg` is the fruit (the colour is `colours/orange.svg`) |
| `family/`   | 8     | all words from the list |
| `school/`   | 10    | all words from the list |
| `numbers/`  | 10    | `one.svg` … `ten.svg`: the quantity shown as objects to count, reusing the pictures above (1 dog, 2 birds, 3 cats, 4 apples, 5 pigs, 6 bananas, 7 rabbits, 8 pencils, 9 books, 10 sheep) |

## Source and license

All 58 illustrations were created from scratch for English Adventure as
hand-written SVG code, drawn in the flat style of the mockups in `maketa/`
(Claude Code wrote them on behalf of the project team). They contain no third-party images, clip-art,
icon sets or fonts, and no external URLs. They belong to the project and can be
changed freely. The team still needs to choose a license for the repository.

Every file uses `viewBox="0 0 200 200"` on a transparent background, with the
same palette as the app (navy `#1d2a4f` for eyes and details). Please keep this
style for new pictures. You can edit the files in any vector editor (Figma,
Inkscape) or as text.

If you add images from elsewhere, list each one below with the source URL,
author and license (e.g. CC0, CC BY 4.0), and only use images that may be
reused freely.

| File | Source | Author | License |
|------|--------|--------|---------|
| _(none yet)_ | | | |

## Missing images / fallback

Words without an image have `image: undefined` (use `hasImage: false` in the
topic file). `getWordsWithImages()` leaves them out of picture games, and the
`<WordImage>` component shows the Slovenian word instead (or the colour, for
Colours). It does the same if an image file fails to load.

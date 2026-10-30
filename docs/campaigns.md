# Campaign packs

The level overlay has one selector per campaign. Campaign 1 contains levels
1–100; Campaign 2 contains 101–200; Campaign 3 contains 201–300; Campaign 4 contains 301–400; Campaign 5 contains 401–500; Campaign 6 contains 501–600; Campaign 7 contains 601–700. Every position in later campaigns mirrors its
Campaign 1 counterpart's size, tier, and difficulty label, with a different
territory layout. Campaign 1's maps, IDs, saved progress, and sessions are preserved.

| Tier | Campaign 1 | Campaign 2 | Campaign 3 | Campaign 4 | Campaign 5 | Campaign 6 | Campaign 7 | Board sizes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Kitten | 1–10 | 101–110 | 201–210 | 301–310 | 401–410 | 501–510 | 601–610 | 4×4, 5×5 |
| Playful | 11–25 | 111–125 | 211–225 | 311–325 | 411–425 | 511–525 | 611–625 | 6×6, 7×7 |
| Clever | 26–40 | 126–140 | 226–240 | 326–340 | 426–440 | 526–540 | 626–640 | 8×8, 9×9 |
| Master | 41–50 | 141–150 | 241–250 | 341–350 | 441–450 | 541–550 | 641–650 | 10×10 |
| Explorer | 51–60 | 151–160 | 251–260 | 351–360 | 451–460 | 551–560 | 651–660 | 8×8 |
| Adventurer | 61–70 | 161–170 | 261–270 | 361–370 | 461–470 | 561–570 | 661–670 | 9×9 |
| Champion | 71–80 | 171–180 | 271–280 | 371–380 | 471–480 | 571–580 | 671–680 | 10×10 |
| Legend | 81–90 | 181–190 | 281–290 | 381–390 | 481–490 | 581–590 | 681–690 | 11×11 |
| Grandmaster | 91–100 | 191–200 | 291–300 | 391–400 | 491–500 | 591–600 | 691–700 | 12×12 |

Progress is stored under globally unique IDs such as `level-101`, so the campaigns
have separate completion records. Opening the overlay selects the active level's
campaign and tier. Switching campaigns keeps the same selected tier.

Finishing level 100 celebrates Campaign 1 and offers to start Campaign 2 at
101. Finishing level 200 offers Campaign 3 at 201. Tier milestones use the current campaign's global ranges (110 → 111,
125 → 126, and so on). Finishing the last registered campaign offers Free Play.
When another pack is registered, the previous finale automatically offers it.

## Adding the next hundred

Campaigns are fixed data in `src/data/campaigns/`; no campaign maps are generated
during app startup. The registry is `src/data/levels.ts`, and shared progression
metadata is in `src/data/campaign-types.ts`.

1. Generate the next pack:

   ```bash
   npm run generate:campaign
   ```

   With seven registered campaigns, this writes
   `src/data/campaigns/campaign-8.ts`, containing levels 701–800.
   Optional flags are `--campaign 8`, `--seed 123`, and `--output PATH`.
   It refuses to overwrite an existing file or regenerate a released campaign.

2. Import and register the new data in `src/data/levels.ts`:

   ```ts
   import { CAMPAIGN_8_LEVELS } from './campaigns/campaign-8';

   // Add after Campaign 7 in CAMPAIGNS:
   defineCampaign(8, CAMPAIGN_8_LEVELS),
   ```

3. Validate before releasing:

   ```bash
   npm test
   npm run validate:maps
   npm run build
   npm run test:e2e -- --workers=2
   ```

The registry enforces complete, consecutively numbered 100-level packs and
matching tier ranges. Navigation, campaign labels/counts, milestones, validation,
and tests discover registered packs automatically.

The authoring script mirrors Campaign 1, uses deterministic seeds, and independently
proves a single valid solution for every generated map. Its layout fingerprint
rejects rotations, reflections, and color-only relabeling of any released map,
as well as duplicates within the new pack. Attempts are bounded; failure writes
no partial pack. The campaign audit repeats these checks for every later pack.

Campaign 1 is validated as originally released and remains unchanged. Difficulty
matching means preserving its labels and size progression; it does not assert
identical human solving difficulty. Static pack files keep maps stable across
future generator changes.

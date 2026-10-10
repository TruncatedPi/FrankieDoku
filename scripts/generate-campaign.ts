import { parseArgs } from 'node:util';
import { existsSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { CAMPAIGNS, CAMPAIGN_LEVELS, LEVELS_PER_CAMPAIGN, defineCampaign, type CampaignLevel } from '../src/data/levels';
import { generatePuzzle, hashString } from '../src/engine/generator';
import { validateMap } from './map-validator';
import { mapFingerprint } from './map-fingerprint';

/** Offline authoring only. Released packs are fixed data, never regenerated at startup. */
export function generateCampaignLevels(number: number, template: CampaignLevel[], existing: CampaignLevel[], seed = hashString(`FrankieDoku:campaign-${number}:v1`)): CampaignLevel[] {
  if (!Number.isSafeInteger(number) || number < 2 || !Number.isSafeInteger(number * LEVELS_PER_CAMPAIGN)) throw new Error('Campaign number must be an integer >= 2');
  if (template.length !== LEVELS_PER_CAMPAIGN) throw new Error('Template must contain 100 levels');
  const fingerprints = new Set(existing.map(mapFingerprint));
  const levels: CampaignLevel[] = [];
  for (const [position, original] of template.entries()) {
    const levelNumber = (number - 1) * LEVELS_PER_CAMPAIGN + position + 1;
    let accepted = false;
    for (let attempt = 0; attempt < 1000; attempt++) {
      const mapSeed = hashString(`${seed}:${number}:${position}:${attempt}`);
      const rounds = attempt < 250 ? 60 : 1 + ((attempt - 250) % original.size);
      const puzzle = generatePuzzle(original.size, mapSeed, rounds);
      const key = mapFingerprint(puzzle);
      if (fingerprints.has(key)) continue;
      const validation = validateMap(puzzle);
      if (!validation.valid) throw new Error(`Level ${levelNumber} failed independent validation: ${validation.errors.join('; ')}`);
      levels.push({
        ...puzzle, id: `level-${levelNumber}`, levelNumber,
        name: `${original.name} · Campaign ${number}`, tier: original.tier,
        difficulty: original.difficulty, mirrorsLevelId: original.id,
      });
      fingerprints.add(key);
      accepted = true;
      break;
    }
    if (!accepted) throw new Error(`Could not find a distinct map for level ${levelNumber} after 1000 attempts; no pack was written`);
  }
  defineCampaign(number, levels);
  return levels;
}

function main() {
  const { values } = parseArgs({ options: {
    campaign: { type: 'string', default: String(CAMPAIGNS.length + 1) },
    output: { type: 'string' }, seed: { type: 'string' }, help: { type: 'boolean' },
  } });
  if (values.help) {
    console.log('Usage: npm run generate:campaign -- [--campaign N] [--seed N] [--output PATH]\nGenerates the next 100-level pack, mirroring Campaign 1 and excluding all released layouts.\nThen import its file and add defineCampaign(N, CAMPAIGN_N_LEVELS) in src/data/levels.ts.\nExisting files are never overwritten.');
    return;
  }
  const number = Number(values.campaign);
  if (number !== CAMPAIGNS.length + 1) throw new Error(`Generate the next campaign (${CAMPAIGNS.length + 1}); released campaigns cannot be regenerated`);
  const output = resolve(values.output ?? `src/data/campaigns/campaign-${number}.ts`);
  if (existsSync(output)) throw new Error(`Output already exists: ${output}`);
  const seed = values.seed === undefined ? undefined : Number(values.seed);
  if (seed !== undefined && (!/^\d+$/.test(values.seed!) || !Number.isSafeInteger(seed))) throw new Error('Seed must be a nonnegative safe integer');
  const levels = generateCampaignLevels(number, CAMPAIGNS[0].levels, CAMPAIGN_LEVELS, seed);
  const relativeModelPath = relative(dirname(output), resolve('src/data/campaign-types')).split('\\').join('/');
  const modelPath = relativeModelPath.startsWith('.') ? relativeModelPath : './' + relativeModelPath;
  const rows = levels.map(level => '  ' + JSON.stringify(level)).join(',\n');
  writeFileSync(output, `import type { CampaignLevel } from '${modelPath}';\n\n// Fixed, independently verified maps. Generated with scripts/generate-campaign.ts.\nexport const CAMPAIGN_${number}_LEVELS: CampaignLevel[] = [\n${rows}\n];\n`);
  console.log(`Wrote ${levels.length} distinct, unique-solution maps for Campaign ${number} to ${output}\nRegister the pack in src/data/levels.ts, then run npm test and npm run validate:maps.`);
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try { main(); } catch (error) { console.error(String(error)); process.exitCode = 1; }
}

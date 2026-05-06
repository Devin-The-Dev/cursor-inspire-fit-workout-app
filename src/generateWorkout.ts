import type { InspirationKind, Exercise, WorkoutRoutine, WorkoutSection } from './types';

function fnv1a(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickExercises(
  rng: () => number,
  arr: Exercise[],
  count: number,
  exclude?: Set<string>
): Exercise[] {
  const pool = [...arr];
  const out: Exercise[] = [];

  for (let i = 0; i < count && pool.length; i++) {
    let idx = Math.floor(rng() * pool.length);
    let tries = 0;
    while (exclude && tries < pool.length) {
      const k = pool[idx].name;
      if (!exclude.has(k)) break;
      idx = (idx + 1) % pool.length;
      tries++;
    }
    const [chosen] = pool.splice(idx, 1);
    if (chosen !== undefined) {
      out.push(chosen);
      exclude?.add(chosen.name);
    }
  }
  return out;
}

const WARMUP_BASE: Exercise[] = [
  { name: 'Easy cardio', detail: '3 min — brisk walk, jog, or bike to raise core temperature' },
  { name: 'Arm circles', detail: '2 × 10 each direction — open the shoulders' },
  { name: 'Leg swings', detail: '10 front/back each leg — hips and hamstrings' },
  { name: 'World’s greatest stretch', detail: '5 each side — thoracic spine and hips' },
  { name: 'Cat-cow', detail: '10 slow reps — spine mobility' },
  { name: 'Ankle rocks', detail: '10 each side — prep for jumps or direction changes' },
];

const COOLDOWN_BASE: Exercise[] = [
  { name: 'Forward fold', detail: '45s — breathe into hamstrings' },
  { name: 'Figure-four stretch', detail: '60s each side — glutes and hips' },
  { name: 'Doorway pec stretch', detail: '45s each side — chest and posture' },
  { name: 'Child’s pose', detail: '60s — lower back release' },
  { name: 'Supine twist', detail: '45s each side — spine unwind' },
];

const SPORT_POOLS: Record<string, Exercise[]> = {
  run: [
    { name: 'Strides', detail: '6 × 80m @ comfortably hard — neuromuscular prep' },
    { name: 'Tempo intervals', detail: '4 × 3 min @ threshold, 90s easy — aerobic power' },
    { name: 'Hill repeats', detail: '8 × 45s uphill, jog down — strength endurance' },
    { name: 'Long-run finish', detail: 'Add final 10–15% at steady effort — race simulation' },
  ],
  court: [
    { name: 'Lateral shuffles', detail: '3 × 20s each direction — defensive footwork' },
    { name: 'Box jumps or bounds', detail: '4 × 5 — elastic explosiveness' },
    { name: 'Suicides or line drills', detail: '4 rounds — change of direction' },
    { name: 'Jump rope complexes', detail: '3 × 1 min — rhythm and calves' },
  ],
  mat: [
    { name: 'Turkish get-up practice', detail: '3 each side light — total-body stability' },
    { name: 'Handstand or wall walk holds', detail: '5 × 20–40s — shoulder integrity' },
    { name: 'L-sit or hollow-body rocks', detail: '4 × 12 — core compression' },
    { name: 'Skin the cat or shoulder rolls', detail: '3 × 3 controlled — shoulder mobility' },
  ],
  ring: [
    { name: 'Heavy bag rounds', detail: '4 × 3 min — tempo and combos' },
    { name: 'Shadowboxing layers', detail: '3 × 3 min — footwork + defense' },
    { name: 'Med-ball slams', detail: '4 × 12 — trunk power' },
    { name: 'Defense drills', detail: '10 min partner or solo slips/weaves' },
  ],
  water: [
    { name: 'Pull-focused sets', detail: '8 × 50m on tight interval — stroke strength' },
    { name: 'Kick sets with board', detail: '400m total — legs and streamline' },
    { name: 'Build 100s', detail: '4 × 100m negative split — pacing skill' },
    { name: 'Underwater streamline pushes', detail: '8 × 12m — breakout power' },
  ],
  default: [
    { name: 'Compound strength tri-set', detail: '3 rounds: squat pattern + push + pull — full-body base' },
    { name: 'EMOM conditioning', detail: '12 min — alternate cardio burst + core each minute' },
    { name: 'Carry finisher', detail: '3 × 40m farmer’s / suitcase carries — grip and posture' },
    { name: 'Plyo ladder', detail: '3 rounds: jump squat, skater, split squat jump — power endurance' },
  ],
};

const CELEBRITY_FLAVOR: Exercise[] = [
  { name: 'Red-carpet posture circuit', detail: '3 rounds: wall slides, band pull-aparts, dead bugs — camera-ready alignment' },
  { name: 'Stage stamina intervals', detail: '5 × 2 min hard / 1 min easy — performance energy' },
  { name: 'Hollywood pump superset', detail: '4 rounds: incline press + row — balanced upper body' },
  { name: 'Travel-ready hotel room AMRAP', detail: '15 min: push-ups, split squats, plank up-downs — minimal equipment' },
];

const CHARACTER_FLAVOR: Exercise[] = [
  { name: 'Hero origin circuit', detail: '4 rounds: crawl, carry, sprint short — “training montage” density' },
  { name: 'Battle-ready complexes', detail: '5 rounds: kettlebell swing + goblet squat + push press — power stamina' },
  { name: 'Quest cardio', detail: '25 min mixed: incline walk bursts + bodyweight strength — long-journey endurance' },
  { name: 'Legend finisher', detail: '10 min core armor: hollow rocks, side planks, dead bugs — unshakeable midline' },
];

function sportBucket(raw: string): keyof typeof SPORT_POOLS {
  const s = raw.toLowerCase();
  if (/run|marathon|track|soccer|football|rugby|field/i.test(s)) return 'run';
  if (/swim|water|polo|surf/i.test(s)) return 'water';
  if (/box|mma|fight|wrestl|kick/i.test(s)) return 'ring';
  if (/yoga|pilates|gymnast|dance|cheer/i.test(s)) return 'mat';
  if (/basket|tennis|volley|badminton|pickle|squash|hockey|lacrosse/i.test(s)) return 'court';
  return 'default';
}

function titleCase(raw: string): string {
  return raw
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

export function generateWorkout(
  kind: InspirationKind,
  inspirationRaw: string,
  variationSeed = 0
): WorkoutRoutine {
  const inspiration = inspirationRaw.trim() || 'Your inspiration';
  const labeled = titleCase(inspiration);
  const seed = fnv1a(`${kind}:${inspiration.toLowerCase()}:${variationSeed}`) ^ variationSeed * 2654435761;
  const rng = mulberry32(seed);

  const used = new Set<string>();

  const warm = pickExercises(rng, WARMUP_BASE, 3, used);
  const cool = pickExercises(rng, COOLDOWN_BASE, 3, used);

  let mainPool: Exercise[] = [];
  let focusLabel = '';

  if (kind === 'sport') {
    const bucket = sportBucket(inspiration);
    mainPool = [
      ...SPORT_POOLS[bucket],
      ...SPORT_POOLS.default.filter((e) => !SPORT_POOLS[bucket].some((x) => x.name === e.name)),
    ];
    focusLabel = `${labeled} — ${bucket === 'default' ? 'sport-specific power & conditioning' : `${bucket}-biased athletic work`}`;
  } else if (kind === 'celebrity') {
    mainPool = [...CELEBRITY_FLAVOR, ...SPORT_POOLS.default];
    focusLabel = `${labeled} — spotlight stamina & balanced strength`;
  } else {
    mainPool = [...CHARACTER_FLAVOR, ...SPORT_POOLS.default];
    focusLabel = `${labeled} — narrative stamina & heroic density`;
  }

  const mainPick = pickExercises(rng, mainPool, 4, used);

  const conditioning: Exercise[] = [
    {
      name: 'Metabolic finisher',
      detail:
        kind === 'sport'
          ? '8 min AMRAP: 10 burpees + 20 mountain climbers — late-game gas tank'
          : kind === 'celebrity'
            ? '6 min: alternate 30s fast shadowboxing or fast feet + 30s plank — camera-ready engine'
            : '7 min: alternate bear crawl 20m + 15 jump lunges — story-mode endurance',
    },
    {
      name: 'Grip & trunk cash-out',
      detail: '3 rounds: 30s dead hang or plate pinch + 12 slow reverse crunch — tie the routine together',
    },
  ];

  const sections: WorkoutSection[] = [
    { title: 'Warm-up', exercises: warm },
    { title: 'Main work', exercises: mainPick },
    { title: 'Conditioning', exercises: pickExercises(rng, conditioning, 2, used) },
    { title: 'Cool-down', exercises: cool },
  ];

  const estimatedMinutes =
    kind === 'sport' ? 45 + Math.floor(rng() * 20) : 40 + Math.floor(rng() * 25);

  const headline =
    kind === 'sport'
      ? `${labeled} Training Block`
      : kind === 'celebrity'
        ? `The ${labeled} Session`
        : `${labeled} Protocol`;

  const subtitle =
    kind === 'sport'
      ? `Built around patterns that echo ${labeled}: acceleration, repeated efforts, and resilient posture.`
      : kind === 'celebrity'
        ? `A routine styled after public-performance demands—presence, endurance, and composed strength.`
        : `A workout that mirrors an archetype’s journey—power when it counts and stamina for the long arc.`;

  return {
    headline,
    subtitle,
    focusLabel,
    estimatedMinutes,
    sections,
  };
}

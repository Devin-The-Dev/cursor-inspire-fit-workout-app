/** YouTube IDs checked for public playability (not private/removed). */
const CURATED_IDS: Record<string, string> = {
  'easy cardio': 'ml6cT4AZdqI',
  'arm circles': '140RTNMciH8',
  'leg swings': 'difYoBtZi2s',
  "world's greatest stretch": 'NIz2MdMqBxk',
  'cat-cow': 'kqnua4rHVVA',
  'ankle rocks': 't2dlr4OzCro',
  'forward fold': 'phiM5CgL3m4',
  'figure-four stretch': '2VE_NLcNMvQ',
  'doorway pec stretch': 'XSvYPcRlvFI',
  "child's pose": '2MJGg-dUKh0',
  'supine twist': 'ezyMaQEaVaI',
  strides: '-uMaiCo3lWA',
  'tempo intervals': '5hYBHMkFBXg',
  'hill repeats': 'xClbrvTBbjo',
  'long-run finish': 'brFHyOtTwH4',
  'lateral shuffles': 'mziPKITnPeQ',
  'box jumps or bounds': 'lOIkdj5AYss',
  'suicides or line drills': 'MPL487ToJt8',
  'jump rope complexes': '3dwMzERxpRw',
  'turkish get-up practice': '0bWRPC49-KI',
  'handstand or wall walk holds': 'NK_OcHEm8yM',
  'l-sit or hollow-body rocks': '44ScXWFaVBs',
  'skin the cat or shoulder rolls': '44vYDHorwkM',
  'heavy bag rounds': '7EHSN5T-ZQE',
  'shadowboxing layers': 'fWfsbL2ulj8',
  'med-ball slams': 'CkO1mfSBvv4',
  'defense drills': 'wT6xZHlS7cc',
  'pull-focused sets': 'eGYUrbJ3TmM',
  'kick sets with board': 'S6MYM8vkmS8',
  'build 100s': 'nD2dZVsrBq4',
  'underwater streamline pushes': 'Ij0QS8R-F8s',
  'compound strength tri-set': 'xqvCmoLULNY',
  'emom conditioning': 'nmwgirgXLYM',
  'carry finisher': 'Fkzk_RqlYig',
  'plyo ladder': 'qv3hoZqSk3c',
  'red-carpet posture circuit': 'bxn9FBrt4-A',
  'stage stamina intervals': 'ml6cT4AZdqI',
  'hollywood pump superset': 'IODxDxX7oi4',
  'travel-ready hotel room amrap': 'IODxDxX7oi4',
  'hero origin circuit': 'TU8QYVW0gDU',
  'battle-ready complexes': 'VLwajhRb4lQ',
  'quest cardio': 'ml6cT4AZdqI',
  'legend finisher': '44ScXWFaVBs',
  'metabolic finisher': 'qLBImHhCXSw',
  'grip & trunk cash-out': 'dOCQjaasbGs',
  'squat jump': 'lOIkdj5AYss',
  skater: 'mziPKITnPeQ',
  'split squat jump': 'qv3hoZqSk3c',
  'squat pattern': 'xqvCmoLULNY',
  'push pattern': 'xqvCmoLULNY',
  'pull pattern': 'xqvCmoLULNY',
  'cardio burst': 'nmwgirgXLYM',
  'core drill': 'nmwgirgXLYM',
  'wall slides': 'bxn9FBrt4-A',
  'band pull-aparts': 'bxn9FBrt4-A',
  'dead bug': '44ScXWFaVBs',
  'incline press': 'IODxDxX7oi4',
  row: 'xqvCmoLULNY',
  'push-up': 'IODxDxX7oi4',
  'split squat': 'qv3hoZqSk3c',
  'plank up-down': 'dOCQjaasbGs',
  crawl: 'TU8QYVW0gDU',
  'loaded carry': 'Fkzk_RqlYig',
  sprint: '-uMaiCo3lWA',
  'kettlebell swing': 'VLwajhRb4lQ',
  'goblet squat': 'VLwajhRb4lQ',
  'push press': 'VLwajhRb4lQ',
  'incline walk burst': 'ml6cT4AZdqI',
  'bodyweight strength': 'xqvCmoLULNY',
  'hollow rock': '44ScXWFaVBs',
  'side plank': 'dOCQjaasbGs',
  burpee: 'qLBImHhCXSw',
  'mountain climber': 'qLBImHhCXSw',
  'fast feet': 'ml6cT4AZdqI',
  'plank hold': 'dOCQjaasbGs',
  'bear crawl': 'TU8QYVW0gDU',
  'jump lunge': 'qv3hoZqSk3c',
  'dead hang': 'dOCQjaasbGs',
  'plate pinch': 'dOCQjaasbGs',
  'reverse crunch': 'dOCQjaasbGs',
};

interface CompoundExerciseTutorial {
  name: string;
  videoId: string;
}

const COMPOUND_TUTORIALS: Record<string, CompoundExerciseTutorial[]> = {
  'compound strength tri-set': [
    { name: 'Squat pattern', videoId: CURATED_IDS['squat pattern'] },
    { name: 'Push pattern', videoId: CURATED_IDS['push pattern'] },
    { name: 'Pull pattern', videoId: CURATED_IDS['pull pattern'] },
  ],
  'emom conditioning': [
    { name: 'Cardio burst', videoId: CURATED_IDS['cardio burst'] },
    { name: 'Core drill', videoId: CURATED_IDS['core drill'] },
  ],
  'plyo ladder': [
    { name: 'Squat jump', videoId: CURATED_IDS['squat jump'] },
    { name: 'Skater', videoId: CURATED_IDS.skater },
    { name: 'Split squat jump', videoId: CURATED_IDS['split squat jump'] },
  ],
  'red-carpet posture circuit': [
    { name: 'Wall slides', videoId: CURATED_IDS['wall slides'] },
    { name: 'Band pull-aparts', videoId: CURATED_IDS['band pull-aparts'] },
    { name: 'Dead bug', videoId: CURATED_IDS['dead bug'] },
  ],
  'hollywood pump superset': [
    { name: 'Incline press', videoId: CURATED_IDS['incline press'] },
    { name: 'Row', videoId: CURATED_IDS.row },
  ],
  'travel-ready hotel room amrap': [
    { name: 'Push-up', videoId: CURATED_IDS['push-up'] },
    { name: 'Split squat', videoId: CURATED_IDS['split squat'] },
    { name: 'Plank up-down', videoId: CURATED_IDS['plank up-down'] },
  ],
  'hero origin circuit': [
    { name: 'Crawl', videoId: CURATED_IDS.crawl },
    { name: 'Loaded carry', videoId: CURATED_IDS['loaded carry'] },
    { name: 'Sprint', videoId: CURATED_IDS.sprint },
  ],
  'battle-ready complexes': [
    { name: 'Kettlebell swing', videoId: CURATED_IDS['kettlebell swing'] },
    { name: 'Goblet squat', videoId: CURATED_IDS['goblet squat'] },
    { name: 'Push press', videoId: CURATED_IDS['push press'] },
  ],
  'quest cardio': [
    { name: 'Incline walk burst', videoId: CURATED_IDS['incline walk burst'] },
    { name: 'Bodyweight strength', videoId: CURATED_IDS['bodyweight strength'] },
  ],
  'legend finisher': [
    { name: 'Hollow rock', videoId: CURATED_IDS['hollow rock'] },
    { name: 'Side plank', videoId: CURATED_IDS['side plank'] },
    { name: 'Dead bug', videoId: CURATED_IDS['dead bug'] },
  ],
  'metabolic finisher': [
    { name: 'Burpee', videoId: CURATED_IDS.burpee },
    { name: 'Mountain climber', videoId: CURATED_IDS['mountain climber'] },
    { name: 'Fast feet', videoId: CURATED_IDS['fast feet'] },
    { name: 'Plank hold', videoId: CURATED_IDS['plank hold'] },
    { name: 'Bear crawl', videoId: CURATED_IDS['bear crawl'] },
    { name: 'Jump lunge', videoId: CURATED_IDS['jump lunge'] },
  ],
  'grip & trunk cash-out': [
    { name: 'Dead hang', videoId: CURATED_IDS['dead hang'] },
    { name: 'Plate pinch', videoId: CURATED_IDS['plate pinch'] },
    { name: 'Reverse crunch', videoId: CURATED_IDS['reverse crunch'] },
  ],
};

export interface ExerciseTutorialVideo {
  name: string;
  videoId: string;
  videoUrl: string;
}

function normalizeExerciseName(name: string): string {
  return name.replace(/[\u2018\u2019]/g, "'").trim().toLowerCase();
}

export function getExerciseVideoId(exerciseName: string): string | null {
  return CURATED_IDS[normalizeExerciseName(exerciseName)] ?? null;
}

export function getExerciseTutorialVideos(exerciseName: string): ExerciseTutorialVideo[] {
  const normalized = normalizeExerciseName(exerciseName);
  const compound = COMPOUND_TUTORIALS[normalized];

  if (compound) {
    return compound.map((video) => ({
      name: video.name,
      videoId: video.videoId,
      videoUrl: getWatchUrl(video.videoId),
    }));
  }

  const singleVideoId = CURATED_IDS[normalized];
  if (!singleVideoId) return [];

  return [
    {
      name: exerciseName,
      videoId: singleVideoId,
      videoUrl: getWatchUrl(singleVideoId),
    },
  ];
}

export function getWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getYouTubeAppUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function searchUrl(exerciseName: string): string {
  const query = encodeURIComponent(`${exerciseName} how to exercise form tutorial`);
  return `https://www.youtube.com/results?search_query=${query}`;
}

export function getExerciseVideoUrl(exerciseName: string): string {
  const id = getExerciseVideoId(exerciseName);
  return id ? getWatchUrl(id) : searchUrl(exerciseName);
}

export function withVideoUrl<T extends { name: string }>(
  exercise: T
): T & { videoUrl: string; videoId: string | null; tutorialVideos: ExerciseTutorialVideo[] } {
  const videoId = getExerciseVideoId(exercise.name);
  const tutorialVideos = getExerciseTutorialVideos(exercise.name);

  return {
    ...exercise,
    videoId,
    videoUrl: videoId ? getWatchUrl(videoId) : searchUrl(exercise.name),
    tutorialVideos,
  };
}

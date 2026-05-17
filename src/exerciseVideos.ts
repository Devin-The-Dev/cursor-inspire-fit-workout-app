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
};

function normalizeExerciseName(name: string): string {
  return name.replace(/[\u2018\u2019]/g, "'").trim().toLowerCase();
}

export function getExerciseVideoId(exerciseName: string): string | null {
  return CURATED_IDS[normalizeExerciseName(exerciseName)] ?? null;
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
): T & { videoUrl: string; videoId: string | null } {
  const videoId = getExerciseVideoId(exercise.name);
  return {
    ...exercise,
    videoId,
    videoUrl: videoId ? getWatchUrl(videoId) : searchUrl(exercise.name),
  };
}

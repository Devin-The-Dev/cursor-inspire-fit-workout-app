export type InspirationKind = 'sport' | 'celebrity' | 'character';

export type Gender = 'female' | 'male' | 'non_binary' | 'prefer_not_to_say';

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

export type WorkoutDuration = 30 | 45 | 60;

export interface UserProfile {
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  durationMinutes: WorkoutDuration;
}

export const DEFAULT_PROFILE: UserProfile = {
  age: 30,
  gender: 'prefer_not_to_say',
  activityLevel: 'moderate',
  durationMinutes: 45,
};

export interface ExerciseTemplate {
  name: string;
  detail: string;
}

export interface Exercise extends ExerciseTemplate {
  videoUrl: string;
  videoId: string | null;
}

export interface WorkoutSection {
  title: string;
  exercises: Exercise[];
}

export interface WorkoutRoutine {
  headline: string;
  subtitle: string;
  focusLabel: string;
  tailoringLabel: string;
  estimatedMinutes: number;
  sections: WorkoutSection[];
}

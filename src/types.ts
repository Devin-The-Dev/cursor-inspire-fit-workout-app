export type InspirationKind = 'sport' | 'celebrity' | 'character';

export interface Exercise {
  name: string;
  detail: string;
}

export interface WorkoutSection {
  title: string;
  exercises: Exercise[];
}

export interface WorkoutRoutine {
  headline: string;
  subtitle: string;
  focusLabel: string;
  estimatedMinutes: number;
  sections: WorkoutSection[];
}

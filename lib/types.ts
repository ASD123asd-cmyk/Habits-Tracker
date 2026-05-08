export type TaskCategory = 'study' | 'revision' | 'sleep' | 'meal' | 'work' | 'habit' | 'break' | 'exercise';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type CalendarView = 'day' | 'week' | 'month' | 'year';

export interface LifeTask {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  priority: Priority;
  category: TaskCategory;
  difficulty: number;
  focusLevel: number;
  color: string;
  reminderMinutes: number[];
  completed: boolean;
  mood?: 'calm' | 'locked-in' | 'stressed' | 'energized';
}

export interface AnimeTheme {
  id: string;
  anime: string;
  characters: string[];
  colors: string[];
  quote: string;
  icon: string;
  effect: string;
}

export interface PomodoroCycle { label: string; focus: number; break: number; rounds: number; }

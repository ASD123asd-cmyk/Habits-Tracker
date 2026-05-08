import type { PomodoroCycle } from './types';

export const pomodoroPresets: PomodoroCycle[] = [
  { label: 'Classic 25/5', focus: 25, break: 5, rounds: 4 },
  { label: 'Deep Work 50/10', focus: 50, break: 10, rounds: 3 },
  { label: 'Ultra Focus 90', focus: 90, break: 20, rounds: 1 }
];

export function generatePomodoro(totalMinutes: number): PomodoroCycle {
  if (totalMinutes <= 70) return { label: 'Classic 25/5', focus: 25, break: 5, rounds: Math.max(1, Math.floor(totalMinutes / 30)) };
  if (totalMinutes <= 150) return { label: 'Deep Work 50/10', focus: 50, break: 10, rounds: Math.max(1, Math.floor(totalMinutes / 60)) };
  return { label: 'Ultra Focus 90', focus: 90, break: 20, rounds: Math.max(1, Math.floor(totalMinutes / 110)) };
}

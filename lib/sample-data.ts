import type { LifeTask } from './types';
import { todayISO } from './date';

export const seedTasks: LifeTask[] = [
  {
    id: 't1', title: 'Physics deep work: electromagnetism', description: 'Derive core formulas, solve 20 exam questions, mark weak spots.', date: todayISO(), startTime: '06:30', endTime: '08:00', priority: 'critical', category: 'study', difficulty: 5, focusLevel: 5, color: '#00BFFF', reminderMinutes: [5, 0], completed: false, mood: 'locked-in'
  },
  {
    id: 't2', title: 'Breakfast + recovery', description: 'Protein, water, sunlight, no phone scrolling.', date: todayISO(), startTime: '08:05', endTime: '08:35', priority: 'medium', category: 'meal', difficulty: 1, focusLevel: 1, color: '#A7F3D0', reminderMinutes: [5], completed: true, mood: 'calm'
  },
  {
    id: 't3', title: 'Math revision sprint', description: 'Functions and probability spaced-repetition circuit.', date: todayISO(), startTime: '10:00', endTime: '11:50', priority: 'high', category: 'revision', difficulty: 4, focusLevel: 5, color: '#CFEFFF', reminderMinutes: [5, 0], completed: false, mood: 'energized'
  },
  {
    id: 't4', title: 'Sleep shutdown ritual', description: 'Pack bag, review tomorrow, stretch, screens off.', date: todayISO(), startTime: '22:10', endTime: '22:45', priority: 'critical', category: 'sleep', difficulty: 2, focusLevel: 2, color: '#818CF8', reminderMinutes: [15, 5], completed: false, mood: 'calm'
  }
];

export const weeklyStudy = [
  { day: 'Mon', study: 5.5, sleep: 7.2, score: 84 },
  { day: 'Tue', study: 6.2, sleep: 7.0, score: 89 },
  { day: 'Wed', study: 4.8, sleep: 6.5, score: 76 },
  { day: 'Thu', study: 7.0, sleep: 7.4, score: 93 },
  { day: 'Fri', study: 6.5, sleep: 7.1, score: 91 },
  { day: 'Sat', study: 4.0, sleep: 8.0, score: 80 },
  { day: 'Sun', study: 3.5, sleep: 8.3, score: 78 }
];

export const achievements = ['7-day streak', '90-minute ultra focus', 'Sleep guardian', 'Revision samurai', 'No-phone morning'];

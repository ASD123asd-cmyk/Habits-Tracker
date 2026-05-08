'use client';

import { create } from 'zustand';
import type { CalendarView, LifeTask } from './types';
import { seedTasks } from './sample-data';
import { todayISO } from './date';

interface AuraState {
  tasks: LifeTask[];
  selectedDate: string;
  view: CalendarView;
  focusTaskId?: string;
  themeId: string;
  setDate: (date: string) => void;
  setView: (view: CalendarView) => void;
  addTask: (task: LifeTask) => void;
  toggleTask: (id: string) => void;
  startFocus: (id: string) => void;
  stopFocus: () => void;
  setTheme: (id: string) => void;
}

export const useAuraStore = create<AuraState>((set) => ({
  tasks: seedTasks,
  selectedDate: todayISO(),
  view: 'month',
  themeId: 'dragon-ball',
  setDate: (selectedDate) => set({ selectedDate }),
  setView: (view) => set({ view }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  toggleTask: (id) => set((state) => ({ tasks: state.tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task) })),
  startFocus: (focusTaskId) => set({ focusTaskId }),
  stopFocus: () => set({ focusTaskId: undefined }),
  setTheme: (themeId) => set({ themeId })
}));

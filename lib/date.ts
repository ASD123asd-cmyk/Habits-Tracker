export const todayISO = () => new Date().toISOString().slice(0, 10);
export const examDate = () => {
  const now = new Date();
  const target = new Date(now.getFullYear() + 1, 5, 4, 9, 0, 0);
  return target;
};
export const diffToExam = () => {
  const diff = Math.max(0, examDate().getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60)
  };
};
export const monthMatrix = (cursor: Date) => {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return date;
  });
};
export const iso = (date: Date) => date.toISOString().slice(0, 10);

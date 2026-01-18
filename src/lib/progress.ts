// Track lesson completion and progress per course (client-side)
const KEY = 'hr_progress_v1';

type ProgressState = {
  [courseId: string]: {
    completedLessons: string[];
  };
};

function read(): ProgressState {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

function write(state: ProgressState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function markLessonComplete(courseId: string | number, lessonId: string) {
  const s = read();
  const id = String(courseId);
  s[id] = s[id] || { completedLessons: [] };
  const arr = s[id].completedLessons;
  const idx = arr.indexOf(lessonId);
  if (idx === -1) arr.push(lessonId);
  else arr.splice(idx, 1); // toggle for demo

  write(s);
}

export function getProgress(courseId: string | number, totalLessons = 3) {
  const s = read();
  const id = String(courseId);
  const completed = s[id]?.completedLessons?.length || 0;
  if (totalLessons === 0) return 0;
  const pct = Math.round((completed / totalLessons) * 100);
  return Math.min(100, Math.max(0, pct));
}
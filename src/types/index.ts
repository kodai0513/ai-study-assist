export interface StudySession {
  id: string;
  theme: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // minutes
  date: string; // YYYY-MM-DD format
}

export interface StudyStats {
  totalMinutes: number;
  totalSessions: number;
  themeBreakdown: { [theme: string]: number };
  dailyStats: { [date: string]: number };
}

export type TimerMode = 'focus' | 'break' | 'idle';

export interface TimerState {
  mode: TimerMode;
  timeLeft: number; // seconds
  isRunning: boolean;
  currentSession: StudySession | null;
  theme: string;
}

export interface StudyAiComment {
  id: string;
  studySessionId: string;
  comment: string;
}
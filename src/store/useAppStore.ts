import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StudySession, StudyStats, TimerState, TimerMode, StudyAiComment } from '../types';
import { format } from 'date-fns';
import { ulid } from 'ulid';

interface AppState {
  sessionTotal: number;
  // Timer state
  timer: TimerState;
  // Study sessions
  sessions: StudySession[];
  comments: StudyAiComment[];
  
  // Actions
  setTimerMode: (mode: TimerMode) => void;
  setTimeLeft: (time: number) => void;
  setIsRunning: (running: boolean) => void;
  setTheme: (theme: string) => void;
  startSession: (theme: string) => void;
  completeSession: () => void;
  addMultipleComments: (comments: StudyAiComment[]) => void;
  changeBreakTime: () => void;
  changeFocusTime: () => void;
  setSessionTotal: (second: number) => void;
  
  // Computed stats
  getStats: () => StudyStats;
  getStatsExcludingLast: () => StudyStats;
}

const FOCUS_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      timer: {
        mode: 'idle',
        timeLeft: FOCUS_TIME,
        isRunning: false,
        currentSession: null,
        theme: '',
      },
      sessionTotal: 0,
      sessions: [],
      comments: [],

      setTimerMode: (mode) => {
        const timeLeft = mode === 'break' ? BREAK_TIME : FOCUS_TIME;
        set((state) => ({
          timer: { ...state.timer, mode, timeLeft, isRunning: false },
        }));
      },

      setTimeLeft: (timeLeft) =>
        set((state) => ({
          timer: { ...state.timer, timeLeft },
        })),

      setIsRunning: (isRunning) =>
        set((state) => ({
          timer: { ...state.timer, isRunning },
        })),

      setTheme: (theme) =>
        set((state) => ({
          timer: { ...state.timer, theme },
        })),

      startSession: (theme) => {
        const session: StudySession = {
          id: ulid(),
          theme,
          startTime: new Date(),
          duration: 0,
          date: format(new Date(), 'yyyy-MM-dd'),
        };

        set((state) => ({
          timer: {
            ...state.timer,
            currentSession: session,
            theme,
            mode: 'focus',
            timeLeft: FOCUS_TIME,
            isRunning: true,
          },
        }));
      },

      completeSession: () => {
        const { sessionTotal, timer } = get();
        if (timer.currentSession) {
          const completedSession: StudySession = {
            ...timer.currentSession,
            endTime: new Date(),
            duration: Math.floor(sessionTotal / 60),
          };

          set((state) => ({
            sessions: [...state.sessions, completedSession],
            sessionTotal: 0,
            timer: {
              theme: '',
              currentSession: null,
              mode: 'idle',
              timeLeft: FOCUS_TIME,
              isRunning: false,
            },
          }));
        }
      },

      addMultipleComments: (newComments) =>
        set((state) => ({
          comments: [...state.comments, ...newComments],
        })),

      getStats: () => {
        const { sessions } = get();
        const totalMinutes = sessions.reduce((sum, session) => sum + session.duration, 0);
        const totalSessions = sessions.length;

        const themeBreakdown: { [theme: string]: number } = {};
        const dailyStats: { [date: string]: number } = {};

        sessions.forEach((session) => {
          themeBreakdown[session.theme] = (themeBreakdown[session.theme] || 0) + session.duration;
          dailyStats[session.date] = (dailyStats[session.date] || 0) + session.duration;
        });

        return {
          totalMinutes,
          totalSessions,
          themeBreakdown,
          dailyStats,
        };
      },

      getStatsExcludingLast: () => {
        const { sessions } = get();

        // sessions配列の最後の要素を除いた新しい配列を作成
        const sessionsToCalculate = sessions.slice(0, -1);

        // 以降の計算はすべて sessionsToCalculate を使用する
        const totalMinutes = sessionsToCalculate.reduce((sum, session) => sum + session.duration, 0);
        const totalSessions = sessionsToCalculate.length;

        const themeBreakdown: { [theme: string]: number } = {};
        const dailyStats: { [date: string]: number } = {};

        sessionsToCalculate.forEach((session) => {
          themeBreakdown[session.theme] = (themeBreakdown[session.theme] || 0) + session.duration;
          dailyStats[session.date] = (dailyStats[session.date] || 0) + session.duration;
        });

        return {
          totalMinutes,
          totalSessions,
          themeBreakdown,
          dailyStats,
        };
      },

      changeBreakTime: () => {
        set((state) => ({
          timer: {
            ...state.timer,
            mode: 'break',
            timeLeft: BREAK_TIME,
            isRunning: true,
          },
        }));
      },

      changeFocusTime: () => {
        set((state) => ({
          timer: {
            ...state.timer,
            mode: 'focus',
            timeLeft: FOCUS_TIME,
            isRunning: true,
          },
        }));
      },

      setSessionTotal: (second) => {
        set((state) => ({
          sessionTotal: state.sessionTotal + second
        }));
      }
    }),
    {
      name: 'ai-focus-partner-storage',
    }
  )
);
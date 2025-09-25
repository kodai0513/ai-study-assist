import React from 'react';
import { Clock, Target, Trophy, BookOpen } from 'lucide-react';
import { StatsCard } from '../molecules/StatsCard';
import { useAppStore } from '../../store/useAppStore';

export const StatsOverview: React.FC = () => {
  const { getStats } = useAppStore();
  const stats = getStats();

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return hours > 0 ? `${hours}時間${mins}分` : `${mins}分`;
  };

  const topTheme = Object.entries(stats.themeBreakdown)
    .sort(([, a], [, b]) => b - a)[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="総学習時間"
        value={formatTime(stats.totalMinutes)}
        subtitle="積み重ねた時間"
        icon={Clock}
        color="blue"
      />
      
      <StatsCard
        title="完了セッション"
        value={stats.totalSessions.toString()}
        subtitle="回のセッション"
        icon={Target}
        color="green"
      />
      
      <StatsCard
        title="学習テーマ"
        value={Object.keys(stats.themeBreakdown).length.toString()}
        subtitle="種類のテーマ"
        icon={BookOpen}
        color="purple"
      />
      
      <StatsCard
        title="最も多い学習"
        value={topTheme ? topTheme[0] : '未設定'}
        subtitle={topTheme ? formatTime(topTheme[1]) : ''}
        icon={Trophy}
        color="blue"
      />
    </div>
  );
};
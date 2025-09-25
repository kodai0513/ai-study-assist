import React from 'react';
import { Card } from '../atoms/Card';
import { Text } from '../atoms/Text';
import { useAppStore } from '../../store/useAppStore';

export const StudyInsights: React.FC = () => {
  const { getStats } = useAppStore();
  const stats = getStats();
  console.log(stats);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return hours > 0 ? `${hours}時間${mins}分` : `${mins}分`;
  };

  if (stats.totalSessions === 0) return null;

  return (
    <Card>
      <Text variant="h4" color="white" weight="semibold" className="mb-4">
        最近の学習実績
      </Text>
      <div className="space-y-2">
        <Text variant="body" color="slate">
          ✨ 素晴らしい学習の継続です！
        </Text>
        <Text variant="body" color="slate">
          📚 これまでに {stats.totalSessions} 回のセッションを完了しました
        </Text>
        <Text variant="body" color="slate">
          ⏰ 合計 {formatTime(stats.totalMinutes)} の集中学習を達成
        </Text>
        {Object.keys(stats.themeBreakdown).length > 1 && (
          <Text variant="body" color="slate">
            🎯 {Object.keys(stats.themeBreakdown).length} 種類のテーマで幅広く学習中
          </Text>
        )}
      </div>
    </Card>
  );
};
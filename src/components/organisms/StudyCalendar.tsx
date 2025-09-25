import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { Card } from '../atoms/Card';
import { Text } from '../atoms/Text';
import { useAppStore } from '../../store/useAppStore';

export const StudyCalendar: React.FC = () => {
  const { getStats } = useAppStore();
  const stats = getStats();
  
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getIntensity = (minutes: number) => {
    if (minutes === 0) return 'bg-slate-700';
    if (minutes < 30) return 'bg-blue-500/30';
    if (minutes < 60) return 'bg-blue-500/60';
    return 'bg-blue-500';
  };

  return (
    <Card>
      <Text variant="h4" color="white" weight="semibold" className="mb-6">
        学習カレンダー - {format(today, 'yyyy年M月')}
      </Text>
      
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-slate-400 pb-2">
            {day}
          </div>
        ))}
        
        {days.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const minutes = stats.dailyStats[dateStr] || 0;
          
          return (
            <div
              key={day.toString()}
              className={`
                aspect-square rounded-lg flex items-center justify-center text-xs font-medium
                transition-all duration-200 cursor-pointer hover:scale-110
                ${getIntensity(minutes)}
                ${isToday(day) ? 'ring-2 ring-blue-400' : ''}
                ${isSameMonth(day, today) ? 'text-white' : 'text-slate-500'}
              `}
              title={`${format(day, 'M月d日')}: ${minutes}分`}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>学習時間が少ない</span>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-sm bg-slate-700"></div>
          <div className="w-3 h-3 rounded-sm bg-blue-500/30"></div>
          <div className="w-3 h-3 rounded-sm bg-blue-500/60"></div>
          <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
        </div>
        <span>学習時間が多い</span>
      </div>
    </Card>
  );
};
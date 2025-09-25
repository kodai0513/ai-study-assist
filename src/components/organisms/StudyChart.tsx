import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, subDays } from 'date-fns';
import { Card } from '../atoms/Card';
import { Text } from '../atoms/Text';
import { useAppStore } from '../../store/useAppStore';

export const StudyChart: React.FC = () => {
  const { getStats } = useAppStore();
  const stats = getStats();

  // Prepare weekly data
  const weeklyData = [];
  for (let i = 6; i >= 0; i--) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    const dayName = format(subDays(new Date(), i), 'M/d');
    weeklyData.push({
      date: dayName,
      minutes: stats.dailyStats[date] || 0,
    });
  }

  // Prepare theme data
  const themeData = Object.entries(stats.themeBreakdown)
    .map(([theme, minutes]) => ({
      name: theme || '未分類',
      value: minutes,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-700 border border-slate-600 rounded-lg p-3 shadow-lg">
          <p className="text-slate-300">{`${label}`}</p>
          <p className="text-white font-semibold">
            {`${payload[0].value} 分`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Weekly Study Time */}
      <Card>
        <Text variant="h4" color="white" weight="semibold" className="mb-6">
          週間学習時間
        </Text>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="date" 
              stroke="#64748B" 
              fontSize={12}
            />
            <YAxis 
              stroke="#64748B" 
              fontSize={12}
              label={{ value: '分', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="minutes" 
              fill="#3B82F6" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Theme Breakdown */}
      {themeData.length > 0 && (
        <Card>
          <Text variant="h4" color="white" weight="semibold" className="mb-6">
            学習テーマ別内訳
          </Text>
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={themeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {themeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${Math.floor(value)}分`, '学習時間']}
                  contentStyle={{
                    backgroundColor: '#334155',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="space-y-2">
              {themeData.map((entry, index) => (
                <div key={entry.name} className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <Text variant="caption" color="slate">{entry.name}</Text>
                  <Text variant="caption" color="secondary">{Math.floor(entry.value)}分</Text>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
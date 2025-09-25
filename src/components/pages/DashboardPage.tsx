import React from 'react';
import { StatsOverview } from '../organisms/StatsOverview';
import { StudyChart } from '../organisms/StudyChart';
import { StudyCalendar } from '../organisms/StudyCalendar';
import { StudyInsights } from '../organisms/StudyInsights';
import { StudyAiCommen } from '../organisms/StudyAiComment';

export const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Stats Cards */}
        <StatsOverview />

        {/* Charts and Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StudyChart />
          </div>
          <div className="lg:col-span-1">
            <StudyCalendar />
          </div>
        </div>

        {/* Recent Sessions */}
        <StudyInsights />
        <StudyAiCommen />
      </div>
    </div>
  );
};
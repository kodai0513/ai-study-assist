import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/organisms/Header';
import { FocusPage } from './components/pages/FocusPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { AutoMusicPlayer } from './components/audio/AutoMusicPlayer';
import { useAppStore } from './store/useAppStore';
import focusSound from './assets/Focus.mov';
import breakSound from './assets/Break.mp3';

const queryClient = new QueryClient();

function App() {
  const [activeView, setActiveView] = useState<'focus' | 'dashboard'>('focus');
  const { timer } = useAppStore();
  const isFocusMusicPlaying = timer.isRunning && timer.mode === 'focus';
  const isBreakMusicPlaying = timer.isRunning && timer.mode === 'break';

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-900">
        <Header activeView={activeView} onViewChange={setActiveView} />
        {activeView === 'focus' ? <FocusPage /> : <DashboardPage />}
      </div>
      <AutoMusicPlayer shouldPlay={isFocusMusicPlaying} sound={focusSound} />
      <AutoMusicPlayer shouldPlay={isBreakMusicPlaying} sound={breakSound} />
    </QueryClientProvider>
  );
}

export default App;
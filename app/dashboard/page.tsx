import { AnalyticsDashboard } from '@/components/analytics-dashboard';
import { AuraBackground } from '@/components/aura-background';
import { Nav } from '@/components/nav';

export default function DashboardPage() {
  return <><AuraBackground /><Nav /><main className="mx-auto max-w-7xl space-y-6 px-4 py-8 md:px-6"><div className="glass-panel rounded-[2rem] p-8"><p className="tiny-label">Command analytics</p><h1 className="font-display text-5xl font-black">Your training arc dashboard</h1><p className="mt-3 text-white/65">Weekly progress, heatmaps, sleep analytics, task completion, time distribution, and burnout detection.</p></div><AnalyticsDashboard /></main></>;
}

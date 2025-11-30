import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const stats = [
  { label: 'Total Emails', value: '2,847', change: '+12.5%', trend: 'up', icon: 'mail' },
  { label: 'Unread', value: '143', change: '+8.2%', trend: 'up', icon: 'mark_email_unread' },
  { label: 'Important', value: '28', change: '-3.1%', trend: 'down', icon: 'priority_high' },
  { label: 'Avg Response Time', value: '2.3h', change: '+5.4%', trend: 'up', icon: 'schedule' },
];

const recentEmails = [
  { from: 'Sarah Johnson', subject: 'Q4 Marketing Strategy', time: '10 min ago', priority: 'high', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { from: 'Mike Chen', subject: 'Project Update - Phoenix', time: '1 hour ago', priority: 'medium', avatar: 'https://i.pravatar.cc/150?u=mike' },
  { from: 'Emily Davis', subject: 'Budget Review Meeting', time: '2 hours ago', priority: 'high', avatar: 'https://i.pravatar.cc/150?u=emily' },
  { from: 'Alex Kumar', subject: 'Design Mockups Ready', time: '3 hours ago', priority: 'low', avatar: 'https://i.pravatar.cc/150?u=alex' },
];

const insights = [
  { title: 'High Priority Email', desc: 'Sarah Johnson mentioned urgent deadline for Q4 strategy', time: '10 min ago', type: 'urgent' },
  { title: 'Follow-up Needed', desc: 'No response to Mike Chen\'s project update in 24 hours', time: '1 day ago', type: 'warning' },
  { title: 'Meeting Scheduled', desc: 'Budget review meeting confirmed for tomorrow at 2 PM', time: '2 hours ago', type: 'info' },
];

export default function Dashboard() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const triggerSummary = async () => {
    setIsLoading(true);
    try {
      const agentUrl = import.meta.env.VITE_AGENT_API_URL || 'http://localhost:3001/api';
      await fetch(`${agentUrl}/trigger/summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id }),
      });
      alert('Summary generation triggered!');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="text-gray-400">Here's what's happening with your emails today</p>
        </div>
        <button
          onClick={triggerSummary}
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50"
        >
          {isLoading ? 'Generating...' : 'Generate Daily Briefing'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-400">{stat.icon}</span>
              </div>
              <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Email Activity Chart */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Email Activity</h2>
              <p className="text-gray-400 text-sm">Last 7 days</p>
            </div>
            <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
              <span className="material-symbols-outlined text-base">trending_up</span>
              <span>+15.3%</span>
            </div>
          </div>
          
          {/* Chart */}
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 45, 75, 55, 85, 70, 90].map((height, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg transition-all hover:opacity-80" style={{ height: `${height}%` }}></div>
                <span className="text-xs text-gray-500">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                <span className="material-symbols-outlined text-purple-400">edit</span>
              </div>
              <span className="text-white font-medium">Compose Email</span>
            </button>
            <button className="w-full flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                <span className="material-symbols-outlined text-purple-400">search</span>
              </div>
              <span className="text-white font-medium">Search Emails</span>
            </button>
            <button className="w-full flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                <span className="material-symbols-outlined text-purple-400">filter_alt</span>
              </div>
              <span className="text-white font-medium">Apply Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Emails & Insights */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Emails */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Emails</h2>
            <a href="#" className="text-purple-400 hover:text-purple-300 text-sm font-semibold">View All</a>
          </div>
          <div className="space-y-4">
            {recentEmails.map((email, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition cursor-pointer group">
                <img src={email.avatar} alt={email.from} className="w-12 h-12 rounded-full" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-white truncate">{email.from}</p>
                    {email.priority === 'high' && (
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 truncate">{email.subject}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">{email.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">AI Insights</h2>
            <a href="#" className="text-purple-400 hover:text-purple-300 text-sm font-semibold">View All</a>
          </div>
          <div className="space-y-4">
            {insights.map((insight, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  insight.type === 'urgent' ? 'bg-red-500/20' :
                  insight.type === 'warning' ? 'bg-yellow-500/20' :
                  'bg-blue-500/20'
                }`}>
                  <span className={`material-symbols-outlined ${
                    insight.type === 'urgent' ? 'text-red-400' :
                    insight.type === 'warning' ? 'text-yellow-400' :
                    'text-blue-400'
                  }`}>
                    {insight.type === 'urgent' ? 'priority_high' : insight.type === 'warning' ? 'warning' : 'info'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white mb-1">{insight.title}</p>
                  <p className="text-sm text-gray-400 mb-2">{insight.desc}</p>
                  <span className="text-xs text-gray-500">{insight.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

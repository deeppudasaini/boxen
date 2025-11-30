import { useState } from 'react';

const timeframes = ['Last 7 Days', 'Last 30 Days', 'This Quarter', 'All Time'];

const metrics = [
  { label: 'Customer Health Score', value: '87%', change: '+5.2%', trend: 'up' },
  { label: 'New Opportunities', value: '24', change: '+12.0%', trend: 'up' },
  { label: 'At-Risk Accounts', value: '3', change: '-25.0%', trend: 'down' },
  { label: 'Avg Deal Size', value: '$45K', change: '+8.5%', trend: 'up' },
];

const topContacts = [
  { name: 'Jennifer Wilson', company: 'TechCorp Inc', score: 95, trend: 'up', avatar: 'https://i.pravatar.cc/150?u=jennifer' },
  { name: 'Robert Martinez', company: 'Global Solutions', score: 88, trend: 'up', avatar: 'https://i.pravatar.cc/150?u=robert' },
  { name: 'Lisa Anderson', company: 'Innovation Labs', score: 82, trend: 'down', avatar: 'https://i.pravatar.cc/150?u=lisa' },
  { name: 'David Thompson', company: 'Future Systems', score: 78, trend: 'up', avatar: 'https://i.pravatar.cc/150?u=david' },
];

const insights = [
  { title: 'Strong Engagement', desc: 'Jennifer Wilson has responded to 95% of emails this month', type: 'positive', icon: 'trending_up' },
  { title: 'Opportunity Detected', desc: 'Robert Martinez mentioned "budget approval" in recent email', type: 'opportunity', icon: 'lightbulb' },
  { title: 'Risk Alert', desc: 'Lisa Anderson response time increased by 40% this week', type: 'warning', icon: 'warning' },
];

export default function Insights() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Last 7 Days');

  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Business & Relationship Insights</h1>
          <p className="text-gray-400">Comprehensive analysis of your email relationships</p>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                selectedTimeframe === timeframe
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition">
            <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
            <p className="text-3xl font-bold text-white mb-2">{metric.value}</p>
            <div className="flex items-center gap-1">
              <span className={`material-symbols-outlined text-sm ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {metric.trend === 'up' ? 'trending_up' : 'trending_down'}
              </span>
              <span className={`text-sm font-semibold ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Engagement Score Chart */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Engagement Score Trend</h2>
          <div className="h-64 flex items-end justify-between gap-3">
            {[60, 65, 70, 68, 75, 80, 87].map((height, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg" style={{ height: `${height}%` }}></div>
                <span className="text-xs text-gray-500">W{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Relationship Distribution */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Relationship Distribution</h2>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              {/* Donut Chart Placeholder */}
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="80" fill="none" stroke="#1f2937" strokeWidth="32" />
                <circle cx="96" cy="96" r="80" fill="none" stroke="url(#gradient1)" strokeWidth="32" strokeDasharray="251 251" strokeDashoffset="63" />
                <circle cx="96" cy="96" r="80" fill="none" stroke="url(#gradient2)" strokeWidth="32" strokeDasharray="251 251" strokeDashoffset="188" />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9333ea" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">87%</p>
                  <p className="text-sm text-gray-400">Healthy</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
              <span className="text-sm text-gray-400">Strong (75%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <span className="text-sm text-gray-400">Moderate (20%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
              <span className="text-sm text-gray-400">Weak (5%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Contacts & Insights */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Contacts */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Top Engaged Contacts</h2>
            <a href="#" className="text-purple-400 hover:text-purple-300 text-sm font-semibold">View All</a>
          </div>
          <div className="space-y-4">
            {topContacts.map((contact, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition">
                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white">{contact.name}</p>
                  <p className="text-sm text-gray-400">{contact.company}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end mb-1">
                    <span className="text-lg font-bold text-white">{contact.score}</span>
                    <span className={`material-symbols-outlined text-sm ${contact.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {contact.trend === 'up' ? 'trending_up' : 'trending_down'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Engagement Score</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Key Insights</h2>
            <a href="#" className="text-purple-400 hover:text-purple-300 text-sm font-semibold">View All</a>
          </div>
          <div className="space-y-4">
            {insights.map((insight, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  insight.type === 'positive' ? 'bg-green-500/20' :
                  insight.type === 'opportunity' ? 'bg-blue-500/20' :
                  'bg-yellow-500/20'
                }`}>
                  <span className={`material-symbols-outlined ${
                    insight.type === 'positive' ? 'text-green-400' :
                    insight.type === 'opportunity' ? 'text-blue-400' :
                    'text-yellow-400'
                  }`}>
                    {insight.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white mb-1">{insight.title}</p>
                  <p className="text-sm text-gray-400">{insight.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

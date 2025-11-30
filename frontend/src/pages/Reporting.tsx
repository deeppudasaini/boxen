import { useState } from 'react';

const reportTypes = ['Weekly', 'Monthly', 'Quarterly'];

const metrics = [
  { label: 'Emails Processed', value: '3,247', change: '+12.5%', trend: 'up' },
  { label: 'Opportunities Found', value: '42', change: '+18.2%', trend: 'up' },
  { label: 'Productivity Score', value: '92%', change: '+5.1%', trend: 'up' },
  { label: 'Avg Response Time', value: '1.8h', change: '-8.3%', trend: 'down' },
];

const topPerformers = [
  { metric: 'Fastest Response', value: 'Sarah Johnson', detail: '45 min avg', icon: 'speed' },
  { metric: 'Most Engaged', value: 'Mike Chen', detail: '98% reply rate', icon: 'trending_up' },
  { metric: 'Best Follow-up', value: 'Emily Davis', detail: '100% completion', icon: 'task_alt' },
];

const weeklyHighlights = [
  { day: 'Monday', emails: 142, important: 12 },
  { day: 'Tuesday', emails: 168, important: 15 },
  { day: 'Wednesday', emails: 195, important: 18 },
  { day: 'Thursday', emails: 178, important: 14 },
  { day: 'Friday', emails: 153, important: 11 },
  { day: 'Saturday', emails: 45, important: 3 },
  { day: 'Sunday', emails: 32, important: 2 },
];

export default function Reporting() {
  const [selectedType, setSelectedType] = useState('Weekly');

  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Intelligent Reporting</h1>
          <p className="text-gray-400">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex gap-3">
          {reportTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedType === type
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {type}
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
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Activity */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Weekly Activity</h2>
              <p className="text-gray-400 text-sm">Email volume and priority distribution</p>
            </div>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-400 transition">
              View Details
            </button>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-3">
            {weeklyHighlights.map((day, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg"
                    style={{ height: `${(day.emails / 200) * 200}px` }}
                  ></div>
                  <div
                    className="w-full bg-gradient-to-t from-red-600 to-orange-600 rounded-t-lg"
                    style={{ height: `${(day.important / 20) * 40}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{day.day.slice(0, 3)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
              <span className="text-sm text-gray-400">Total Emails</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-600 to-orange-600"></div>
              <span className="text-sm text-gray-400">Important</span>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Top Performers</h2>
          <div className="space-y-4">
            {topPerformers.map((performer, idx) => (
              <div key={idx} className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-purple-400">{performer.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">{performer.metric}</p>
                    <p className="font-semibold text-white">{performer.value}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 ml-13">{performer.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Productivity Trends */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Productivity Trends</h2>
            <p className="text-gray-400 text-sm">Response time and completion rate over time</p>
          </div>
        </div>

        <div className="h-64 relative">
          <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="prodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#9333ea" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Area fill */}
            <path
              d="M 0 160 L 100 140 L 200 120 L 300 110 L 400 100 L 500 90 L 600 80 L 700 70 L 800 60 L 800 200 L 0 200 Z"
              fill="url(#prodGradient)"
            />
            {/* Line */}
            <path
              d="M 0 160 L 100 140 L 200 120 L 300 110 L 400 100 L 500 90 L 600 80 L 700 70 L 800 60"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="3"
            />
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Export Section */}
      <div className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-white/10 rounded-2xl">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Export Report</h3>
          <p className="text-gray-400 text-sm">Download your complete analytics report</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition flex items-center gap-2">
          <span className="material-symbols-outlined">download</span>
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  );
}

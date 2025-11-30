import { useState } from 'react';

const timeRanges = ['Last 7 Days', 'Last 30 Days', 'This Month', 'This Year', 'Custom'];

const stats = [
  { label: 'Avg Response Time', value: '2h 15m', change: '-12%', trend: 'down', icon: 'schedule' },
  { label: 'Total Emails', value: '1,847', change: '+8.2%', trend: 'up', icon: 'mail' },
  { label: 'Peak Activity', value: 'Wednesday', change: '+15%', trend: 'up', icon: 'calendar_today' },
  { label: 'Email Threads', value: '342', change: '+5.1%', trend: 'up', icon: 'forum' },
];

const emailCategories = [
  { name: 'Work', count: 1247, percentage: 68, color: 'from-purple-600 to-pink-600' },
  { name: 'Personal', count: 385, percentage: 21, color: 'from-blue-600 to-cyan-600' },
  { name: 'Promotions', count: 215, percentage: 11, color: 'from-green-600 to-emerald-600' },
];

const topSenders = [
  { name: 'team@company.com', count: 145, avatar: 'https://i.pravatar.cc/150?u=team' },
  { name: 'notifications@app.com', count: 98, avatar: 'https://i.pravatar.cc/150?u=notifications' },
  { name: 'support@service.com', count: 76, avatar: 'https://i.pravatar.cc/150?u=support' },
  { name: 'updates@platform.com', count: 54, avatar: 'https://i.pravatar.cc/150?u=updates' },
];

export default function Analytics() {
  const [selectedRange, setSelectedRange] = useState('Last 30 Days');

  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Communication Analytics</h1>
          <p className="text-gray-400">Detailed insights into your email patterns and behavior</p>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                selectedRange === range
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
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

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Email Volume Chart */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Email Volume Trends</h2>
              <p className="text-gray-400 text-sm">Daily email activity over time</p>
            </div>
            <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
              <span className="material-symbols-outlined text-base">trending_up</span>
              <span>+8.2%</span>
            </div>
          </div>
          
          {/* Line Chart */}
          <div className="h-64 relative">
            <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#9333ea" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 150 Q 100 120, 150 100 T 300 80 T 450 60 T 600 40"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
              />
              <path
                d="M 0 150 Q 100 120, 150 100 T 300 80 T 450 60 T 600 40 L 600 200 L 0 200 Z"
                fill="url(#chartGradient)"
              />
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9333ea" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-gray-500">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Email Categories */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Email Categories</h2>
          <div className="space-y-6">
            {emailCategories.map((category, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{category.name}</span>
                  <span className="text-gray-400 text-sm">{category.count}</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{category.percentage}% of total</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Response Time & Top Senders */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Response Time Pattern */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Response Time Pattern</h2>
          <div className="h-64 flex items-end justify-between gap-2">
            {[
              { day: 'Mon', height: 80 },
              { day: 'Tue', height: 60 },
              { day: 'Wed', height: 90 },
              { day: 'Thu', height: 70 },
              { day: 'Fri', height: 85 },
              { day: 'Sat', height: 40 },
              { day: 'Sun', height: 30 },
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg transition-all hover:opacity-80" style={{ height: `${item.height}%` }}></div>
                <span className="text-xs text-gray-500">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Senders */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Top Senders</h2>
            <a href="#" className="text-purple-400 hover:text-purple-300 text-sm font-semibold">View All</a>
          </div>
          <div className="space-y-4">
            {topSenders.map((sender, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{sender.name}</p>
                  <p className="text-sm text-gray-400">{sender.count} emails</p>
                </div>
                <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                    style={{ width: `${(sender.count / topSenders[0].count) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition flex items-center gap-2">
          <span className="material-symbols-outlined">download</span>
          <span>Export Report</span>
        </button>
      </div>
    </div>
  );
}

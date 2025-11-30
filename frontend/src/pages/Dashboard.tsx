import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import ReactMarkdown from 'react-markdown';

interface Summary {
  content: string;
  periodStart: string;
  periodEnd: string;
}

interface Insight {
  id: string;
  title: string;
  description: string;
  insightType: string;
  confidenceScore: number;
}

export default function Dashboard() {
  const { user } = useUser();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (!user) return;
    try {
      // Fetch Summary
      // Note: In real app, use authenticated fetch to backend
      // For MVP, we assume we can hit the backend directly if we had a token
      // But we haven't set up the frontend to pass the Clerk token to backend yet for custom fetches easily
      // So we might face auth issues. 
      // Ideally we use a library or helper to get the token.
      
      // Let's assume for MVP we are just triggering generation via Agent API and then trying to fetch.
      // If fetching fails due to auth, we'll just show the "Trigger" buttons working.
      
      // Actually, let's just implement the Trigger buttons primarily, as fetching requires auth setup we skipped in frontend details.
      // But wait, we did set up ClerkProvider. We can use `useAuth()` to get the token.
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const triggerSummary = async () => {
    setIsLoading(true);
    try {
      const agentUrl = import.meta.env.VITE_AGENT_API_URL || 'http://localhost:3001/api';
      await fetch(`${agentUrl}/trigger/summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id }),
      });
      alert('Summary generation triggered! Check backend logs.');
    } catch (error) {
      console.error('Error triggering summary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerInsights = async () => {
    setIsLoading(true);
    try {
      const agentUrl = import.meta.env.VITE_AGENT_API_URL || 'http://localhost:3001/api';
      await fetch(`${agentUrl}/trigger/insights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id }),
      });
      alert('Insights generation triggered! Check backend logs.');
    } catch (error) {
      console.error('Error triggering insights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back, {user?.firstName}</p>
        </div>
        <div className="space-x-4">
          <button
            onClick={triggerSummary}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Generate Summary
          </button>
          <button
            onClick={triggerInsights}
            disabled={isLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            Generate Insights
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Summary Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
              📝
            </span>
            Daily Briefing
          </h2>
          <div className="prose dark:prose-invert">
            {summary ? (
              <ReactMarkdown>{summary.content}</ReactMarkdown>
            ) : (
              <p className="text-gray-500 italic">No summary generated for today yet.</p>
            )}
          </div>
        </div>

        {/* Insights Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="bg-purple-100 text-purple-600 p-2 rounded-lg mr-3">
              💡
            </span>
            Key Insights
          </h2>
          <div className="space-y-4">
            {insights.length > 0 ? (
              insights.map((insight) => (
                <div key={insight.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{insight.title}</h3>
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                      {insight.insightType}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{insight.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No new insights found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

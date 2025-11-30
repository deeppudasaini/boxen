import { Link, useLocation } from 'react-router-dom';
import { useUser, UserButton } from '@clerk/clerk-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { name: 'Insights', path: '/insights', icon: 'lightbulb' },
    { name: 'Analytics', path: '/analytics', icon: 'bar_chart' },
    { name: 'Chat', path: '/chat', icon: 'chat_bubble' },
    { name: 'Reporting', path: '/reporting', icon: 'description' },
    { name: 'Settings', path: '/settings', icon: 'settings' },
  ];

  return (
    <div className="relative flex min-h-screen w-full bg-[#0A0118] text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900/50 to-gray-800/50 backdrop-blur-xl border-r border-white/10 p-6 hidden lg:flex flex-col z-20">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
          <div>
            <h1 className="text-xl font-bold">Boxen AI</h1>
            <p className="text-xs text-gray-400">Email Intelligence</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={`material-symbols-outlined ${isActive(item.path) ? 'fill' : ''}`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* User Profile */}
        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3">
            <UserButton afterSignOutUrl="/" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-gray-400 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 relative z-10">
        {/* Top Bar */}
        <header className="sticky top-0 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button className="lg:hidden text-white">
                <span className="material-symbols-outlined">menu</span>
              </button>
              <h2 className="text-lg font-bold text-white">
                {navItems.find(i => isActive(i.path))?.name || 'Dashboard'}
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg transition">
                <span className="material-symbols-outlined">search</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg transition relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="lg:hidden">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="min-h-[calc(100vh-73px)]">
          {children}
        </div>
      </main>
    </div>
  );
}

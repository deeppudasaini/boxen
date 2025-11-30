import { useState } from 'react';

const excludedSenders = [
  'spam@example.com',
  'newsletter@marketing.com',
  'notifications@social.com',
];

export default function Settings() {
  const [newSender, setNewSender] = useState('');
  const [ssnEnabled, setSsnEnabled] = useState(true);
  const [ccEnabled, setCcEnabled] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleAddSender = () => {
    if (newSender.trim()) {
      // Add sender logic here
      setNewSender('');
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Privacy & Security Settings</h1>
        <p className="text-gray-400">Manage your data privacy and account security</p>
      </div>

      {/* Data Control Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Data Control</h2>

        {/* Exclude Senders */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Exclude Senders</h3>
              <p className="text-gray-400 text-sm">Add email addresses that the AI should ignore</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={newSender}
                onChange={(e) => setNewSender(e.target.value)}
                placeholder="email@example.com"
                className="flex-1 md:w-64 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
              <button
                onClick={handleAddSender}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition whitespace-nowrap"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {excludedSenders.map((sender, idx) => (
              <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full group hover:border-red-500/50 transition">
                <span className="text-sm text-white">{sender}</span>
                <button className="text-gray-400 hover:text-red-400 transition">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Data Redaction */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-1">Redact Sensitive Information</h3>
            <p className="text-gray-400 text-sm">Automatically hide sensitive data recognized by AI</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-purple-400">badge</span>
                </div>
                <span className="text-white font-medium">Social Security Numbers</span>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={ssnEnabled}
                  onChange={(e) => setSsnEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-purple-400">credit_card</span>
                </div>
                <span className="text-white font-medium">Credit Card Numbers</span>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={ccEnabled}
                  onChange={(e) => setCcEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Data Deletion */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Request Data Deletion</h3>
              <p className="text-gray-400 text-sm">Permanently delete your personal data from our systems</p>
            </div>
            <button className="px-6 py-3 bg-red-600/80 hover:bg-red-600 rounded-lg font-semibold transition flex items-center gap-2">
              <span className="material-symbols-outlined">delete_forever</span>
              <span>Request Deletion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Security</h2>

        {/* Two-Factor Authentication */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-purple-400">security</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Two-Factor Authentication</h3>
                <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
              </div>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                twoFactorEnabled
                  ? 'bg-green-600/80 hover:bg-green-600'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50'
              }`}
            >
              {twoFactorEnabled ? 'Enabled' : 'Enable 2FA'}
            </button>
          </div>
        </div>

        {/* Encryption Status */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-green-400">enhanced_encryption</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">End-to-End Encryption</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-green-400 font-semibold text-sm">Active</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-green-400 text-3xl">check_circle</span>
          </div>
        </div>

        {/* Session Management */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Active Sessions</h3>
              <p className="text-gray-400 text-sm">Manage devices with access to your account</p>
            </div>
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-semibold transition">
              View Sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

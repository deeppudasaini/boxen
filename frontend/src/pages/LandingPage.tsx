import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#0A0118] text-white overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[150px]"></div>
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[150px]"></div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
            <span className="text-xl font-bold">Boxen AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition">Testimonials</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
            <a href="#faq" className="text-gray-300 hover:text-white transition">FAQ</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-gray-300 hover:text-white transition">Login</Link>
            <Link to="/dashboard" className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
              Get Started Free
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Revolutionize Your Inbox
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                with Conversational AI
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our AI email assistant understands and analyzes your email conversations, providing you with comprehensive insights in real-time.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/dashboard" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition">
                Get Started Free
              </Link>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold text-lg hover:bg-white/20 transition">
                Watch Demo
              </button>
            </div>

            {/* Hero Image/Dashboard Preview */}
            <div className="mt-16 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl">dashboard</span>
                    </div>
                    <p className="text-gray-400">Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Unlock the Full Potential of Your Email
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform is built on three core pillars to give you unparalleled control and understanding of your communications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">forum</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Conversational AI Assistant</h3>
              <p className="text-gray-300">
                Go beyond keywords. Our AI understands context, sentiment, and intent within your email threads.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">bolt</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Real-time Email Processing</h3>
              <p className="text-gray-300">
                Instantly categorize, prioritize, and get summaries of incoming emails as they arrive.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">pie_chart</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Comprehensive Insight Engine</h3>
              <p className="text-gray-300">
                Turn your inbox into a data goldmine with powerful analytics and visualizations.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Email Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are already using Boxen AI to streamline their communication.
            </p>
            <Link to="/dashboard" className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition">
              Start Free Trial
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
              <span className="text-lg font-bold">Boxen AI</span>
            </div>
            <p className="text-gray-400 text-sm">© 2024 Boxen AI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

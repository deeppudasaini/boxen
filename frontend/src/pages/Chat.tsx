import { useState, useRef, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { ChatMessage } from '../components/ChatMessage';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  citations?: any[];
  isThinking?: boolean;
}

const suggestedQuestions = [
  'Summarize my unread emails from this week',
  'Show me all emails from Sarah Johnson',
  'What are my pending action items?',
  'Find emails about the Q4 project',
];

export default function Chat() {
  const { user } = useUser();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (question?: string) => {
    const queryText = question || input;
    if (!queryText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: queryText };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: 'assistant', content: '', isThinking: true }]);

    try {
      const agentUrl = import.meta.env.VITE_AGENT_API_URL || 'http://localhost:3001/api';
      
      const response = await fetch(`${agentUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText, userId: user?.id }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      setMessages((prev) => {
        const newMessages = prev.filter((msg) => !msg.isThinking);
        return [
          ...newMessages,
          { role: 'assistant', content: data.answer, citations: data.citations },
        ];
      });
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => {
        const newMessages = prev.filter((msg) => !msg.isThinking);
        return [
          ...newMessages,
          { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 relative z-10">
        {messages.length === 0 ? (
          <div className="max-w-3xl mx-auto text-center space-y-8 mt-20">
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-white">chat</span>
              </div>
              <h1 className="text-4xl font-bold text-white">How can I help you today?</h1>
              <p className="text-gray-400 text-lg">Ask me anything about your emails and I'll provide intelligent insights</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {suggestedQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(question)}
                  className="p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-xl text-left hover:border-purple-500/50 transition group"
                >
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-purple-400 group-hover:scale-110 transition">lightbulb</span>
                    <p className="text-white text-sm">{question}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg, idx) => (
              <ChatMessage
                key={idx}
                role={msg.role}
                content={msg.content}
                citations={msg.citations}
                isThinking={msg.isThinking}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="px-6 lg:px-10 pb-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl">
            <div className="flex items-end gap-2">
              <textarea
                className="flex-1 bg-transparent border-none text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none px-4 py-3 resize-none max-h-32"
                placeholder="Ask about your emails..."
                rows={1}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
          <p className="text-center text-gray-500 text-xs mt-3">
            AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Citation {
  emailId: string;
  score: number;
}

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  isThinking?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, citations, isThinking }) => {
  const isUser = role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-800 rounded-bl-none dark:bg-gray-700 dark:text-gray-100'
        }`}
      >
        {isThinking ? (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
          </div>
        ) : (
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}

        {citations && citations.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 text-xs">
            <p className="font-semibold mb-1 opacity-70">Sources:</p>
            <div className="flex flex-wrap gap-2">
              {citations.map((cite, idx) => (
                <span
                  key={idx}
                  className="bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-600 opacity-80"
                >
                  Email {cite.emailId.slice(0, 8)}...
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  citations?: any[];
  isThinking?: boolean;
}

export function ChatMessage({ role, content, citations, isThinking }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 size-8 rounded-full flex items-center justify-center ${isUser ? 'bg-primary' : 'bg-[#8d2bee]'}`}>
          {isUser ? (
            <span className="material-symbols-outlined text-white text-sm">person</span>
          ) : (
            <span className="material-symbols-outlined text-white text-sm">smart_toy</span>
          )}
        </div>

        {/* Message Bubble */}
        <div className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
          <div
            className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              isUser
                ? 'bg-primary text-white rounded-tr-sm'
                : 'bg-white/10 text-white rounded-tl-sm border border-white/10'
            }`}
          >
            {isThinking ? (
              <div className="flex gap-1 items-center h-5">
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce"></div>
              </div>
            ) : (
              <ReactMarkdown 
                className="prose prose-invert prose-sm max-w-none"
                components={{
                  p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                  a: ({node, ...props}) => <a className="text-blue-400 hover:underline" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                }}
              >
                {content}
              </ReactMarkdown>
            )}
          </div>

          {/* Citations */}
          {!isUser && citations && citations.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {citations.map((citation, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/60 hover:bg-white/10 transition-colors cursor-pointer"
                  title={`Source: Email from ${citation.metadata?.sender || 'Unknown'} - ${citation.metadata?.subject || 'No Subject'}`}
                >
                  <span className="material-symbols-outlined text-[10px]">mail</span>
                  <span className="truncate max-w-[150px]">
                    {citation.metadata?.subject || 'Email Source'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

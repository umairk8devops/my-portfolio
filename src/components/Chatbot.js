import React, { useEffect, useRef, useState } from 'react';
import { BOT_NAME, SUGGESTIONS, findAnswer } from '../data/chatbotKnowledge';
import './Chatbot.css';

// Floating chat widget: a bottom-right bubble that opens a chat panel.
// 100% client-side — answers come from the local knowledge base, no API calls.
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const greetedRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const pushBotReply = (userText) => {
    setIsTyping(true);
    timerRef.current = setTimeout(() => {
      const answer = findAnswer(userText);
      setMessages((prev) => [...prev, { from: 'bot', parts: answer }]);
      setIsTyping(false);
    }, 650);
  };

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    setMessages((prev) => [...prev, { from: 'user', text: trimmed }]);
    setInput('');
    pushBotReply(trimmed);
  };

  const toggleOpen = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next && !greetedRef.current) {
      greetedRef.current = true;
      setMessages([
        {
          from: 'bot',
          parts: [
            {
              t: `Hi, I’m ${BOT_NAME} — ask me anything about Umair’s professional background: his skills, projects, experience, or certifications.`,
            },
          ],
        },
      ]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  const renderParts = (parts) =>
    parts.map((part, index) => {
      if (part.href) {
        const isExternal = part.href.startsWith('http');
        return (
          <a
            key={index}
            href={part.href}
            {...(isExternal
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className="chatbot-link"
          >
            {part.t}
          </a>
        );
      }
      return <span key={index}>{part.t}</span>;
    });

  return (
    <div className="chatbot">
      {isOpen && (
        <div className="chatbot-panel" role="dialog" aria-label="Chat with Umair's assistant">
          <div className="chatbot-header">
            <div>
              <div className="chatbot-title">{BOT_NAME}</div>
              <div className="chatbot-subtitle">
                Professional background • Instant answers
              </div>
            </div>
            <button
              type="button"
              className="chatbot-close"
              onClick={toggleOpen}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbot-message chatbot-message-${message.from}`}
              >
                {message.from === 'bot'
                  ? renderParts(message.parts)
                  : message.text}
              </div>
            ))}
            {isTyping && (
              <div className="chatbot-message chatbot-message-bot chatbot-typing">
                <span className="chatbot-dot" />
                <span className="chatbot-dot" />
                <span className="chatbot-dot" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {!messages.some((message) => message.from === 'user') && (
            <div className="chatbot-suggestions">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="chatbot-chip"
                  onClick={() => sendMessage(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <form className="chatbot-input-row" onSubmit={handleSubmit}>
            <input
              type="text"
              className="chatbot-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about skills, projects, experience…"
              aria-label="Type your question"
            />
            <button type="submit" className="chatbot-send" aria-label="Send message">
              ➤
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="chatbot-toggle"
        onClick={toggleOpen}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
};

export default Chatbot;

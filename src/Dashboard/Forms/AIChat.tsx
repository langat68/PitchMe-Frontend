import React, { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  HelpCircle,
  TrendingUp,
  FileText
} from 'lucide-react';
import './AIChat.scss';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI resume assistant. I can help you improve your resume, suggest better wording, or answer questions about resume best practices. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "How can I improve my summary?",
    "What skills should I add?",
    "How to write better job descriptions?",
    "ATS optimization tips?"
  ];

  const aiResponses = {
    summary: "Here are some tips for a better summary:\n\n• Start with your years of experience\n• Mention 2-3 key technical skills\n• Include quantifiable achievements\n• End with your career goals\n• Keep it 2-3 sentences long\n\nWould you like me to help you rewrite your current summary?",
    skills: "Great question! Based on current market trends, consider adding:\n\n• Cloud platforms (AWS, Azure, GCP)\n• DevOps tools (Docker, Kubernetes)\n• Testing frameworks (Jest, Cypress)\n• Soft skills (Leadership, Communication)\n\nWhat's your target role? I can suggest more specific skills!",
    descriptions: "To write compelling job descriptions:\n\n• Start with strong action verbs (Led, Developed, Implemented)\n• Include specific numbers and metrics\n• Focus on achievements, not just duties\n• Use keywords from job postings\n• Show business impact\n\nExample: 'Developed React application' → 'Developed React application serving 50K+ users, reducing load time by 40%'",
    ats: "ATS optimization tips:\n\n• Use standard section headings\n• Include keywords from job descriptions\n• Use simple formatting (no tables/graphics)\n• Save as .docx or .pdf\n• Match job requirements closely\n• Use industry-standard job titles\n\nYour current ATS score looks good! Want me to check specific sections?"
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    let aiResponse = "I understand you're asking about resume improvement. Here are some general tips:\n\n• Use action verbs and quantify achievements\n• Tailor your resume to each job application\n• Keep formatting clean and professional\n• Include relevant keywords\n• Proofread carefully\n\nFeel free to ask about specific sections!";

    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('summary') || lowerContent.includes('objective')) {
      aiResponse = aiResponses.summary;
    } else if (lowerContent.includes('skill')) {
      aiResponse = aiResponses.skills;
    } else if (lowerContent.includes('description') || lowerContent.includes('experience') || lowerContent.includes('job')) {
      aiResponse = aiResponses.descriptions;
    } else if (lowerContent.includes('ats') || lowerContent.includes('optimization') || lowerContent.includes('applicant')) {
      aiResponse = aiResponses.ats;
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: aiResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage(inputMessage);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="ai-chat-toggle"
      >
        <MessageCircle className="icon" />
        <span className="sr-only">Open AI Chat</span>
        <div className="notification-badge">1</div>
      </button>
    );
  }

  return (
    <div className="ai-chat-container">
      <div className="ai-chat-header">
        <div className="ai-chat-header-content">
          <div className="ai-chat-header-left">
            <div className="ai-chat-avatar">
              <Bot className="icon" />
            </div>
            <div className="ai-chat-info">
              <h3 className="ai-chat-title">AI Resume Assistant</h3>
              <div className="ai-chat-status">
                <div className="status-indicator"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="ai-chat-close"
          >
            <X className="icon" />
          </button>
        </div>
      </div>

      <div className="ai-chat-content">
        {/* Messages */}
        <div className="ai-chat-messages">
          <div className="messages-container">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type === 'user' ? 'message-user' : 'message-ai'}`}>
                <div className="message-content">
                  <div className={`message-avatar ${message.type === 'user' ? 'avatar-user' : 'avatar-ai'}`}>
                    {message.type === 'user' ? (
                      <User className="icon" />
                    ) : (
                      <Bot className="icon" />
                    )}
                  </div>
                  <div className={`message-bubble ${message.type === 'user' ? 'bubble-user' : 'bubble-ai'}`}>
                    <p className="message-text">
                      {message.content}
                    </p>
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message message-ai">
                <div className="message-content">
                  <div className="message-avatar avatar-ai">
                    <Bot className="icon" />
                  </div>
                  <div className="message-bubble bubble-ai">
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="quick-questions">
            <h4 className="quick-questions-title">
              <HelpCircle className="icon" />
              <span>Quick Questions:</span>
            </h4>
            <div className="quick-questions-grid">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="quick-question-btn"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="ai-chat-input">
          <div className="input-container">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about your resume..."
              onKeyPress={handleKeyPress}
              className="chat-input"
            />
            <button 
              onClick={() => sendMessage(inputMessage)}
              disabled={!inputMessage.trim() || isTyping}
              className="send-btn"
            >
              <Send className="icon" />
            </button>
          </div>
          <div className="input-footer">
            <div className="powered-by">
              <Sparkles className="icon" />
              <span>Powered by AI</span>
            </div>
            <span className="input-hint">Press Enter to send</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
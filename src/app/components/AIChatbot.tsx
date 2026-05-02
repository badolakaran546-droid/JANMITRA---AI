import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User as UserIcon, Sparkles } from 'lucide-react';
import { InfoItem } from '../data/mockData';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: InfoItem[];
}

interface AIChatbotProps {
  data: InfoItem[];
  onSelectItem: (item: InfoItem) => void;
}

export default function AIChatbot({ data, onSelectItem }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm JAANMITR AI, your intelligent government information assistant. I can help you find schemes, jobs, tenders, and compensation programs. What are you looking for today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAIResponse = (userMessage: string): { text: string; suggestions?: InfoItem[] } => {
    const lowerMessage = userMessage.toLowerCase();

    // Keyword matching for better responses
    const keywords = {
      farmer: ['farmer', 'farming', 'agriculture', 'crop', 'kisan', 'kheti'],
      job: ['job', 'naukri', 'employment', 'vacancy', 'career', 'recruitment'],
      scheme: ['scheme', 'yojana', 'benefit', 'subsidy', 'welfare'],
      tender: ['tender', 'contract', 'business', 'contractor'],
      compensation: ['compensation', 'relief', 'insurance', 'claim', 'disaster'],
      education: ['education', 'student', 'scholarship', 'study', 'padhai'],
      housing: ['house', 'home', 'awas', 'housing', 'shelter'],
      loan: ['loan', 'credit', 'financing'],
    };

    let matchedItems: InfoItem[] = [];
    let responseText = '';

    // Check for specific keywords
    if (keywords.farmer.some(k => lowerMessage.includes(k))) {
      matchedItems = data.filter(item =>
        item.tags.some(tag => tag.toLowerCase().includes('agriculture')) ||
        item.eligibility.some(e => e.toLowerCase().includes('farmer'))
      ).slice(0, 3);
      responseText = "I found some excellent schemes and opportunities for farmers. Here are the top matches for you:";
    } else if (keywords.job.some(k => lowerMessage.includes(k))) {
      matchedItems = data.filter(item => item.category === 'Job').slice(0, 3);
      responseText = "I've found several government job opportunities that might interest you:";
    } else if (keywords.scheme.some(k => lowerMessage.includes(k))) {
      matchedItems = data.filter(item => item.category === 'Scheme').slice(0, 3);
      responseText = "Here are some government welfare schemes you might be eligible for:";
    } else if (keywords.tender.some(k => lowerMessage.includes(k))) {
      matchedItems = data.filter(item => item.category === 'Tender').slice(0, 3);
      responseText = "I found these business tenders and contract opportunities:";
    } else if (keywords.compensation.some(k => lowerMessage.includes(k))) {
      matchedItems = data.filter(item => item.category === 'Compensation').slice(0, 3);
      responseText = "Here are compensation and relief programs that might help you:";
    } else if (keywords.education.some(k => lowerMessage.includes(k))) {
      matchedItems = data.filter(item =>
        item.tags.some(tag => tag.toLowerCase().includes('education')) ||
        item.tags.some(tag => tag.toLowerCase().includes('scholarship'))
      ).slice(0, 3);
      responseText = "I've found education-related schemes and opportunities for students:";
    } else if (keywords.housing.some(k => lowerMessage.includes(k))) {
      matchedItems = data.filter(item =>
        item.title.toLowerCase().includes('awas') ||
        item.title.toLowerCase().includes('housing')
      ).slice(0, 3);
      responseText = "Here are housing schemes that could help you get a home:";
    } else if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      responseText = "I can assist you with:\n\n🌾 Government Schemes - Welfare programs and subsidies\n💼 Jobs - Government employment opportunities\n🏗️ Tenders - Business contracts\n💰 Compensation - Relief and insurance claims\n\nJust tell me what you're looking for, or ask questions like:\n• 'Show me farming schemes'\n• 'Are there any jobs for engineers?'\n• 'What compensation is available for flood victims?'";
    } else {
      // General search
      matchedItems = data.filter(item =>
        item.title.toLowerCase().includes(lowerMessage) ||
        item.description.toLowerCase().includes(lowerMessage) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowerMessage))
      ).slice(0, 3);

      if (matchedItems.length > 0) {
        responseText = "Based on your query, I found these relevant programs:";
      } else {
        responseText = "I couldn't find exact matches for that query. Here are some popular programs you might be interested in:";
        matchedItems = data.slice(0, 3);
      }
    }

    return {
      text: responseText,
      suggestions: matchedItems.length > 0 ? matchedItems : undefined,
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center group"
        aria-label="Open AI Chat"
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <>
            <MessageCircle className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-md h-[600px] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">JAANMITR AI</h3>
              <div className="flex items-center gap-1 text-xs opacity-90">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Online
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex gap-2 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'ai'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-gray-300'
                      }`}
                    >
                      {message.sender === 'ai' ? (
                        <Bot className="w-5 h-5" />
                      ) : (
                        <UserIcon className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                      </div>
                      <p className="text-xs opacity-50 mt-1 px-2">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="ml-10 mt-2 space-y-2">
                    {message.suggestions.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => onSelectItem(item)}
                        className="w-full text-left bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 hover:shadow-md transition-all"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-semibold text-blue-600">
                            {item.category}
                          </span>
                          {item.benefit && (
                            <span className="text-xs font-semibold text-green-600">
                              {item.benefit}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-semibold mb-1">{item.title}</h4>
                        <p className="text-xs opacity-70 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex gap-1 mt-2">
                          {item.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <p className="text-xs opacity-70 mb-2">Quick actions:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleQuickAction('Show me farming schemes')}
                  className="text-xs bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  🌾 Farming schemes
                </button>
                <button
                  onClick={() => handleQuickAction('Government jobs')}
                  className="text-xs bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  💼 Government jobs
                </button>
                <button
                  onClick={() => handleQuickAction('Student scholarships')}
                  className="text-xs bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  🎓 Scholarships
                </button>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

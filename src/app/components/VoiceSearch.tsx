import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceSearchProps {
  onResult: (text: string) => void;
}

export default function VoiceSearch({ onResult }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      const sampleQueries = [
        'Show me farming schemes in Bihar',
        'Government jobs for engineers',
        'Student scholarships',
        'Housing schemes',
        'PM Kisan Yojana details',
      ];
      const result = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setTranscript(result);
      onResult(result);
      setIsListening(false);
    }, 2000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return (
    <div className="relative">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`p-3 rounded-xl transition-all ${
          isListening
            ? 'bg-red-500 text-white animate-pulse'
            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
        }`}
        aria-label="Voice Search"
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>

      {isListening && (
        <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 w-64">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="w-5 h-5 text-blue-500 animate-pulse" />
            <span className="text-sm font-medium">Listening...</span>
          </div>
          <div className="flex gap-1">
            <div className="h-8 w-1 bg-blue-500 rounded-full animate-pulse" />
            <div className="h-8 w-1 bg-purple-500 rounded-full animate-pulse [animation-delay:0.2s]" />
            <div className="h-8 w-1 bg-pink-500 rounded-full animate-pulse [animation-delay:0.4s]" />
            <div className="h-8 w-1 bg-blue-500 rounded-full animate-pulse [animation-delay:0.6s]" />
          </div>
          <p className="text-xs opacity-70 mt-2">Speak now in Hindi or English...</p>
        </div>
      )}
    </div>
  );
}

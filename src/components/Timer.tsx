
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  targetDuration: number; // en minutos
  onComplete: () => void;
}

export const Timer = ({ targetDuration, onComplete }: TimerProps) => {
  const [timeElapsed, setTimeElapsed] = useState(0); // en segundos
  const targetSeconds = targetDuration * 60;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(prev => {
        const newTime = prev + 1;
        if (newTime >= targetSeconds) {
          onComplete();
          return targetSeconds;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetSeconds, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (timeElapsed / targetSeconds) * 100;

  return (
    <div className="flex items-center space-x-2">
      <Clock className="h-3 w-3 text-blue-600" />
      <div className="flex items-center space-x-2">
        <span className="text-xs font-mono">
          {formatTime(timeElapsed)} / {formatTime(targetSeconds)}
        </span>
        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

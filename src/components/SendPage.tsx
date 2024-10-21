import React, { useState, useCallback } from 'react';
import MeditationTimer from './MeditationTimer';

const MeditationTimerPage: React.FC = () => {
  const [isMeditating, setIsMeditating] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const handleStartMeditation = useCallback((duration: number) => {
    setIsMeditating(true);
    setTimeRemaining(duration);

    // Clear any existing interval before starting a new one
    if (intervalId) {
      clearInterval(intervalId);
    }

    const id = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        if (prevTimeRemaining <= 1) {
          clearInterval(id);
          setIsMeditating(false);
          return 0;
        }
        return prevTimeRemaining - 1;
      });
    }, 1000);
    
    setIntervalId(id);
  }, [intervalId]);

  const handleStopMeditation = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIsMeditating(false);
    setTimeRemaining(0);
  };

  return (
    <div>
      <h1>Meditation Timer</h1>
      <MeditationTimer
        onStartMeditation={handleStartMeditation} // No need for arrow function wrapping here
        onStopMeditation={handleStopMeditation}
        isMeditating={isMeditating}
        timeRemaining={timeRemaining}
      />
    </div>
  );
};

export default MeditationTimerPage;

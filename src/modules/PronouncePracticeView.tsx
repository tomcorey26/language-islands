import { speakSpanish } from '@/services/TextToSpeechService';
import React, { useState } from 'react';

interface PronouncePracticeViewProps {
  flashCards: FlashCard[];
  setView: React.Dispatch<React.SetStateAction<PageViews>>;
}

const PronouncePracticeView: React.FC<PronouncePracticeViewProps> = ({
  flashCards,
  setView,
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  function handleNextCard() {
    if (currentCardIndex === flashCards.length - 1) {
      setCurrentCardIndex(0);
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  }

  function handlePreviousCard() {
    if (currentCardIndex === 0) {
      setCurrentCardIndex(flashCards.length - 1);
    } else {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  }

  function handleExit() {
    setView('edit');
  }

  function handlePlayAudio() {
    speakSpanish(flashCards[currentCardIndex].translation);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-200 rounded-lg p-8 w-3/4 h-2/4">
        <div className="flex flex-col justify-between h-full">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">Pronounce Practice</h1>
          </div>
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold">
              {flashCards[currentCardIndex].english}
            </h2>
            <h2 className="text-xl font-bold">
              {flashCards[currentCardIndex].translation}
            </h2>
          </div>
          <div className="flex justify-between">
            <div className="flex justify-between w-full">
              <button className="text-3xl" onClick={handlePreviousCard}>
                &larr;
              </button>
              <button className="text-3xl" onClick={handlePlayAudio}>
                &#9658;
              </button>
              <button className="text-3xl" onClick={handleNextCard}>
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PronouncePracticeView;

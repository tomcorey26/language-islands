import FlashcardEditView from '@/modules/FlashcardEditView';
import './App.css';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useState } from 'react';
import PronouncePracticeView from '@/modules/PronouncePracticeView';
import { speakSpanish } from '@/services/TextToSpeechService';

// Features:
// import from excel
// Can create different lists for different langauge areas
// Toggle all translations to be hidden

// Strech goals:
// Have it translate to other languages automatically, e.g show suggestions that the user can click on

function App() {
  const [flashCards, setFlashCards] = useLocalStorage<FlashCard[]>('cards', []);
  const [view, setView] = useState<PageViews>('edit');

  function addFlashCard(english: string, translation: string) {
    setFlashCards([
      {
        english,
        translation,
        translationHidden: false,
        id: crypto.randomUUID(),
      },
      ...flashCards,
    ]);
  }

  function hideAllTranslations() {
    setFlashCards((prev) =>
      prev.map((flashCard) => ({ ...flashCard, translationHidden: true }))
    );
  }

  function showAllTranslations() {
    setFlashCards((prev) =>
      prev.map((flashCard) => ({ ...flashCard, translationHidden: false }))
    );
  }

  function toggleHideTranslation(id: string) {
    const flashCard = flashCards.find((flashCard) => flashCard.id === id);

    if (flashCard?.translationHidden === true) {
      speakSpanish(flashCard.translation);
    }

    setFlashCards((prev) =>
      prev.map((flashCard) =>
        flashCard.id === id
          ? { ...flashCard, translationHidden: !flashCard.translationHidden }
          : flashCard
      )
    );
  }

  if (view === 'practice-pronounce') {
    return <PronouncePracticeView flashCards={flashCards} setView={setView} />;
  }

  return (
    <div>
      <FlashcardEditView
        flashCards={flashCards}
        addFlashCard={addFlashCard}
        hideAllTranslations={hideAllTranslations}
        showAllTranslations={showAllTranslations}
        toggleHideTranslation={toggleHideTranslation}
        setView={setView}
      />
    </div>
  );
}

export default App;

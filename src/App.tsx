import FlashcardEditView from '@/modules/FlashcardEditView';
import './App.css';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useMemo, useState } from 'react';
import PronouncePracticeView from '@/modules/PronouncePracticeView';
import { speakSpanish } from '@/services/TextToSpeechService';
import DecksView from '@/modules/DecksView';

// Features:
// Can create different decks for different langauge areas
// Toggle all translations to be hidden

// Add routing

// Strech goals:
// Have it translate to other languages automatically, e.g show suggestions that the user can click on

function App() {
  const [view, setView] = useState<PageViews>('decks');

  const [decks, setDecks] = useLocalStorage<Deck[]>('decks', [
    {
      id: crypto.randomUUID(),
      name: 'Default deck',
      flashCards: [],
    },
  ]);
  const [currentDeckId, setCurrentDeckId] = useLocalStorage<string>(
    'currentDeckId',
    decks[0]?.id
  );
  const flashCards = useMemo(
    () => decks.find((deck) => deck.id === currentDeckId)?.flashCards ?? [],
    [decks, currentDeckId]
  );

  function addFlashCard(english: string, translation: string) {
    setDecks((prev) => {
      return prev.map((deck) => {
        if (deck.id === currentDeckId) {
          return {
            ...deck,
            flashCards: [
              {
                english,
                translation,
                translationHidden: false,
                id: crypto.randomUUID(),
              },
              ...deck.flashCards,
            ],
          };
        }

        return deck;
      });
    });
  }

  function hideAllTranslations() {
    setDecks((prev) =>
      prev.map((deck) => ({
        ...deck,
        flashCards: deck.flashCards.map((flashCard) => ({
          ...flashCard,
          translationHidden: true,
        })),
      }))
    );
  }

  function showAllTranslations() {
    setDecks((prev) =>
      prev.map((deck) => ({
        ...deck,
        flashCards: deck.flashCards.map((flashCard) => ({
          ...flashCard,
          translationHidden: false,
        })),
      }))
    );
  }

  function toggleHideTranslation(id: string) {
    const flashCard = flashCards.find((flashCard) => flashCard.id === id);

    if (flashCard?.translationHidden === true) {
      speakSpanish(flashCard.translation);
    }

    setDecks((prev) =>
      prev.map((deck) => ({
        ...deck,
        flashCards: deck.flashCards.map((flashCard) =>
          flashCard.id === id
            ? { ...flashCard, translationHidden: !flashCard.translationHidden }
            : flashCard
        ),
      }))
    );
  }

  function onUpload(data: CsvUploadResult) {
    setDecks((prev) =>
      prev.map((deck) => ({
        ...deck,
        flashCards: [
          ...data.map(([english, translation]) => ({
            english,
            translation,
            translationHidden: false,
            id: crypto.randomUUID(),
          })),
          ...deck.flashCards,
        ],
      }))
    );
  }

  function createNewDeck() {
    const newDeck = {
      id: crypto.randomUUID(),
      name: 'New deck',
      flashCards: [],
    };

    setDecks([...decks, newDeck]);
    setCurrentDeckId(newDeck.id);
  }

  if (view === 'decks') {
    return (
      <DecksView
        decks={decks}
        setCurrentDeckId={setCurrentDeckId}
        createNewDeck={createNewDeck}
        setView={setView}
      />
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
        onUpload={onUpload}
      />
    </div>
  );
}

export default App;

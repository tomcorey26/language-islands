import { useState } from 'react';
import './App.css';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Features:
// 1) Form to add a new line item. English and spanish translation
// 3) But it allows you to edit it
// 4) Form adds it to the list
// 5) On click you can hear the pronunciation of the sentence

// list will be saved in local storage
// import from excel
// Can create different lists for different langauge areas
// Toggle all translations to be hidden

// Strech goals:
// Have it translate to other languages automatically

interface FlashCard {
  id: string;
  english: string;
  translation: string;
  translationHidden: boolean;
}

function App() {
  const [flashCards, setFlashCards] = useState<FlashCard[]>([
    {
      id: '2232',
      english: 'hello',
      translation: 'hola',
      translationHidden: false,
    },
  ]);
  const [english, setEnglish] = useState('');
  const [translation, setTranslation] = useState('');

  function addFlashCard() {
    setFlashCards([
      {
        english,
        translation,
        translationHidden: false,
        id: crypto.randomUUID(),
      },
      ...flashCards,
    ]);
    setEnglish('');
    setTranslation('');
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
    setFlashCards((prev) =>
      prev.map((flashCard) =>
        flashCard.id === id
          ? { ...flashCard, translationHidden: !flashCard.translationHidden }
          : flashCard
      )
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="English"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
        />
        <Input
          placeholder="Translation"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
        />
        <Button onClick={addFlashCard} className="col-span-2 mb-4">
          Add
        </Button>
        <div className="col-span-2 mb-6">
          <Button className="mx-2" onClick={hideAllTranslations}>
            Hide All Translations
          </Button>
          <Button
            className="mx-2"
            variant={'secondary'}
            onClick={showAllTranslations}
          >
            Show All Translations
          </Button>
        </div>
        {flashCards.map((flashCard) => (
          <>
            <Card>{flashCard.english}</Card>
            <Card
              className="cursor-pointer"
              onClick={() => toggleHideTranslation(flashCard.id)}
            >
              {flashCard.translationHidden ? '' : flashCard.translation}
            </Card>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;

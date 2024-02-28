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

// Strech goals:
// Have it translate to other languages automatically

interface FlashCard {
  english: string;
  translation: string;
}

function App() {
  const [flashCards, setFlashCards] = useState<FlashCard[]>([
    { english: 'hello', translation: 'hola' },
  ]);
  const [english, setEnglish] = useState('');
  const [translation, setTranslation] = useState('');

  function addFlashCard() {
    setFlashCards([
      {
        english,
        translation,
      },
      ...flashCards,
    ]);
    setEnglish('');
    setTranslation('');
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
        <Button onClick={addFlashCard} className="col-span-2">
          Add
        </Button>
        {flashCards.map((flashCard) => (
          <>
            <Card>{flashCard.english}</Card>
            <Card>{flashCard.translation}</Card>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;

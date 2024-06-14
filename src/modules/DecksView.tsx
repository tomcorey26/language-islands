import { Button } from '@/components/ui/button';
import React from 'react';

interface DecksViewProps {
  decks: Deck[];
  setCurrentDeckId: (id: string) => void;
  createNewDeck: () => void;
  setView: (view: PageViews) => void;
}

const DecksView: React.FC<DecksViewProps> = ({
  decks,
  setCurrentDeckId,
  createNewDeck,
  setView,
}) => {
  function selectDeck(deck: Deck) {
    setCurrentDeckId(deck.id);
    setView('edit');
  }

  function makeNewDeck() {
    createNewDeck();
    setView('edit');
  }

  return (
    <div>
      <h1>Flashcard Decks</h1>
      <div className="grid grid-cols-4 gap-4">
        {decks.map((deck) => (
          <Button
            key={deck.id}
            onClick={() => selectDeck(deck)}
            className="p-8"
          >
            {deck.name}
          </Button>
        ))}
        <Button variant="outline" onClick={() => makeNewDeck()} className="p-8">
          + New Deck
        </Button>
      </div>
    </div>
  );
};

export default DecksView;

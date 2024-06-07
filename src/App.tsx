import './App.css';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import React from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

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
// Have it translate to other languages automatically, e.g show suggestions that the user can click on

type Inputs = {
  english: string;
  translation: string;
};

interface FlashCard {
  id: string;
  english: string;
  translation: string;
  translationHidden: boolean;
}

function App() {
  const [flashCards, setFlashCards] = useLocalStorage<FlashCard[]>('cards', []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addFlashCard(data.english, data.translation);
  };

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
      const msg = new SpeechSynthesisUtterance(flashCard.translation);
      const voices = window.speechSynthesis.getVoices();
      msg.voice = voices.filter(function (voice) {
        return voice.lang == 'es-ES';
      })[0];
      window.speechSynthesis.speak(msg);
    }

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4 col-span-2"
        >
          <div className="col-span-1">
            <Input
              placeholder="English"
              {...register('english', { required: true })}
            />
            {errors.english && (
              <p className="text-red-500 text-left">English is required</p>
            )}
          </div>
          <div className="col-span-1">
            <Input
              placeholder="Translation"
              {...register('translation', { required: true })}
            />
            {errors.translation && (
              <p className="text-red-500 text-left">Translation is required</p>
            )}
          </div>
          <Button className="col-span-2 mb-4">Add</Button>
        </form>
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
          <React.Fragment key={flashCard.id}>
            <Card>{flashCard.english}</Card>
            <Card
              className="cursor-pointer"
              onClick={() => toggleHideTranslation(flashCard.id)}
            >
              {flashCard.translationHidden ? '' : flashCard.translation}
            </Card>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default App;

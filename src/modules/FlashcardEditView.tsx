import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  english: string;
  translation: string;
};

interface FlashcardEditViewProps {
  flashCards: FlashCard[];
  addFlashCard: (english: string, translation: string) => void;
  hideAllTranslations: () => void;
  showAllTranslations: () => void;
  toggleHideTranslation: (id: string) => void;
  setView: (view: PageViews) => void;
}

const FlashcardEditView: React.FC<FlashcardEditViewProps> = ({
  flashCards,
  addFlashCard,
  hideAllTranslations,
  showAllTranslations,
  toggleHideTranslation,
  setView,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addFlashCard(data.english, data.translation);
  };

  return (
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

        <Button
          className="mx-2"
          variant={'outline'}
          onClick={() => setView('practice-pronounce')}
        >
          Pronunciation Mode
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
  );
};

export default FlashcardEditView;

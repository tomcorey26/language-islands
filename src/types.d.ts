interface FlashCard {
  id: string;
  english: string;
  translation: string;
  translationHidden: boolean;
}

type PageViews = 'edit' | 'practice-pronounce';

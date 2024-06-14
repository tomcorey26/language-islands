interface Deck {
  id: string;
  name: string;
  flashCards: FlashCard[];
}

interface FlashCard {
  id: string;
  english: string;
  translation: string;
  translationHidden: boolean;
}

type PageViews = 'decks' | 'edit' | 'practice-pronounce';

type CsvUploadResult = Array<[string, string]>;

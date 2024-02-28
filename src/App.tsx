import { useState } from 'react';
import { SentenceAdder } from '@/components/custom/SentenceAdder';
import './App.css';

// Features:
// 1) Form to add a new line item. English and spanish translation
// 3) But it allows you to edit it
// 4) Form adds it to the list
// 5) On click you can hear the pronunciation of the sentence

// Strech goals:
// Have it translate to other languages automatically

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <SentenceAdder />
    </div>
  );
}

export default App;

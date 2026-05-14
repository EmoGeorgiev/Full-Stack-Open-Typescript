import { useEffect, useState } from 'react';
import type { Diary } from './types';
import diaryService from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    diaryService.getDiaries()
      .then(initialDiaries => setDiaries(initialDiaries));
  }, []);

  return (
    <div>
      <h2>Diary entries</h2>

      <ul>
        {diaries.map(diary => {
          return (
            <li key={diary.id}>
              <p>{diary.date}</p>
              <p>visibility: {diary.visibility}</p>
              <p>weather: {diary.weather}</p>
              <p>comment: {diary.comment}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;

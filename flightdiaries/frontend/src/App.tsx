import React, { useEffect, useState } from 'react';
import type { DiaryEntry, NewDiaryEntry, Visibility, Weather } from './types';
import diaryService from './diaryService';
import axios from 'axios';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    diaryService.getDiaries()
      .then(initialDiaries => setDiaries(initialDiaries));
  }, []);

  const diaryCreation = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!visibility || !weather) {
      return;
    }

    const newDiary: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment
    };

    try {
      await diaryService.addDiary(newDiary)
        .then(returnedDiary => setDiaries(diaries.concat(returnedDiary)));
      setDate('');
      setVisibility(null);
      setWeather(null);
      setComment('');
      setError('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(`Error: ${error.message}`);
        const data = error.response?.data;

        let message = 'Error: ';

        if (Array.isArray(data?.error)) {
          message += data.error.map((o: { message: string }) => o.message).join('\n');
          setError(message);
        }
      }
    }
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <p style={{ color: 'red', whiteSpace: 'pre-line' }}>{error}</p>
      <form onSubmit={diaryCreation}>
        <div>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <input
            value={visibility ?? ''}
            onChange={(e) => setVisibility(e.target.value as Visibility)}
          />
        </div>
        <div>
          <input
            value={weather ?? ''}
            onChange={(e) => setWeather(e.target.value as Weather)}
          />
        </div>
        <div>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button>Add Diary</button>
      </form>

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

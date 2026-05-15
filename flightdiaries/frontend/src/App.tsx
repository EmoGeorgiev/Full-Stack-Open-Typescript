import React, { useEffect, useState } from 'react';
import { Visibility, Weather, type DiaryEntry, type NewDiaryEntry } from './types';
import diaryService from './diaryService';
import axios from 'axios';

const visibilityOptions = Object.values(Visibility);
const weatherOptions = Object.values(Weather);

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
          date:
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          visibility:
          {visibilityOptions.map(option => (
            <label key={option}>
              <input
                type='radio'
                name='visibility'
                value={option}
                onChange={() => setVisibility(option)}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          weather:
          {weatherOptions.map(option => (
            <label key={option}>
              <input
                type='radio'
                name='weather'
                value={option}
                onChange={() => setWeather(option)}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          comment:
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

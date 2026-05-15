import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from './types';

const baseUrl = 'http://localhost:3000';

const getDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(`${baseUrl}/api/diaries`);
  return response.data;
};

const addDiary = async (object: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(`${baseUrl}/api/diaries`, object);
  return response.data;
};

export default { getDiaries, addDiary };

import axios from 'axios';
import type { Diary } from './types';

const baseUrl = 'http://localhost:3000';

const getDiaries = async () => {
  const response = await axios.get<Diary[]>(`${baseUrl}/api/diaries`);
  return response.data;
};

const addDiary = () => {

};

export default { getDiaries, addDiary };

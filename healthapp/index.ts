import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
      throw new Error('The passed argument is not valid');
    }

    const bmi = calculateBmi(height, weight);

    return res.json({
      weight,
      height,
      bmi
    });
  } catch (error: unknown) {
    console.log(error);
    return res
      .status(400)
      .json({
        error: 'malformatted parameters'
      });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { daily_exercises: dailyExercises, target } = req.body;

  if (!dailyExercises || !target) {
    return res
      .status(400)
      .json({
        error: 'parameters missing'
      });
  }

  if (!Array.isArray(dailyExercises) ||
    dailyExercises.some(isNaN) ||
    isNaN(target as number)) {
    return res
      .status(400)
      .json({
        error: 'malformatted parameters'
      });
  }

  const result = calculateExercises(dailyExercises as number[], target as number);

  return res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseHours: number[], target: number): Result => {
  if (exerciseHours.length === 0) {
    throw new Error('exerciseHours array must not be empty');
  }

  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(d => d !== 0).length;
  const average = exerciseHours.reduce((acc, cur) => acc + cur, 0) / exerciseHours.length;
  const success = average >= target;

  let rating: number;

  if (success) {
    rating = 3;
  } else if (target - average < 0.5) {
    rating = 2;
  } else {
    rating = 1;
  }


  let ratingDescription: string;

  if (rating === 1) {
    ratingDescription = 'you did not do good this period';
  } else if (rating === 2) {
    ratingDescription = 'not too bad but could be better';
  } else {
    ratingDescription = 'good job! you met your target training hours';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

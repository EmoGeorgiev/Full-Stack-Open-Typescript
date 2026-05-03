export const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / (height * height)) * 100 * 100;

  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi < 40) {
    return 'Obese (Class II)';
  }
  return 'Obese (Class III)';
}

/*
console.log(calculateBmi(180, 45));
console.log(calculateBmi(180, 58));
console.log(calculateBmi(180, 74));
console.log(calculateBmi(180, 90));
console.log(calculateBmi(180, 100));
*/

if (process.argv[1] === import.meta.filename) {
  const height: number = Number(process.argv[2]);
  const weight: number = Number(process.argv[3]);

  if (isNaN(height)) {
    throw new Error('The passed argument to height is not a number');
  }

  if (isNaN(weight)) {
    throw new Error('The passed argument to weight is not a number');
  }

  try {
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

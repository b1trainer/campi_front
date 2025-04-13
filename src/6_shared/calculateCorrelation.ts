export function calculateCorrelation(array1: number[], array2: number[]): number {
  if (array1.length !== array2.length) {
      throw new Error("Arrays must have the same length");
  }

  if (array1.length < 2) {
      throw new Error("Arrays must contain at least two elements");
  }

  // Вычисление средних значений
  const mean1 = array1.reduce((sum, x) => sum + x, 0) / array1.length;
  const mean2 = array2.reduce((sum, y) => sum + y, 0) / array2.length;

  // Вычисление числителя (ковариация) и знаменателя
  let covariance = 0;
  let variance1 = 0;
  let variance2 = 0;

  for (let i = 0; i < array1.length; i++) {
      const diff1 = array1[i] - mean1;
      const diff2 = array2[i] - mean2;
      
      covariance += diff1 * diff2;
      variance1 += diff1 ** 2;
      variance2 += diff2 ** 2;
  }

  // Вычисление знаменателя
  const denominator = Math.sqrt(variance1 * variance2);

  // Обработка случая нулевой дисперсии
  if (denominator === 0) {
      return NaN; // Как в Excel: возвращает ошибку при нулевой дисперсии
  }

  return covariance / denominator;
}
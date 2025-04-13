export function calculateTStudent(array1: number[], array2: number[]): number {
    if (array1.length < 2 || array2.length < 2) {
        throw new Error('Each array must contain at least two elements.');
    }

    // Вычисление средних значений
    const mean1 = array1.reduce((sum, val) => sum + val, 0) / array1.length;
    const mean2 = array2.reduce((sum, val) => sum + val, 0) / array2.length;

    // Вычисление дисперсий
    const variance1 = computeVariance(array1, mean1);
    const variance2 = computeVariance(array2, mean2);

    // Размеры выборок
    const n1 = array1.length;
    const n2 = array2.length;

    // Вычисление t-статистики
    const numerator = mean1 - mean2;
    const denominator = Math.sqrt(variance1 / n1 + variance2 / n2);

    // Обработка случая с нулевым знаменателем
    if (denominator === 0) {
        if (numerator === 0) {
            throw new Error('Cannot compute t-test: both arrays have zero variance and equal means.');
        }
        return numerator > 0 ? Infinity : -Infinity;
    }

    return numerator / denominator;
}

// Вспомогательная функция для вычисления дисперсии
function computeVariance(arr: number[], mean: number): number {
    const squaredDiffs = arr.map((x) => (x - mean) ** 2);
    const sumSquaredDiffs = squaredDiffs.reduce((a, b) => a + b, 0);
    return sumSquaredDiffs / (arr.length - 1);
}

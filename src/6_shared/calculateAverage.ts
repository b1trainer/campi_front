// Функция для вычисления среднего значения (аналог СРЗНАЧ в Excel)
export function computeExcelAverage(array: number[]): number {
    if (array.length === 0) {
        throw new Error('Массив не должен быть пустым');
    }

    const sum = array.reduce((acc, value) => acc + value, 0);
    return sum / array.length;
}

// Функция для вычисления среднего отклонения (аналог СРОТКЛ в Excel)
export function computeExcelAverageDeviation(array: number[]): number {
    if (array.length === 0) {
        throw new Error('Массив не должен быть пустым');
    }

    const average = computeExcelAverage(array);
    const sumDeviations = array.reduce((acc, value) => acc + Math.abs(value - average), 0);
    return sumDeviations / array.length;
}

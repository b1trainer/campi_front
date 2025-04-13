export function calculateCorrelationPValue(r: number, n: number): number {
    if (n < 3) throw new Error('Sample size must be at least 3');
    if (Math.abs(r) > 1) throw new Error('Correlation coefficient must be in [-1, 1]');

    // Обработка идеальной корреляции
    if (Math.abs(r) === 1) return 0;

    // Вычисление t-статистики
    const t = r * Math.sqrt((n - 2) / (1 - r ** 2));

    // Вычисление степеней свободы
    const df = n - 2;

    // Вычисление двухстороннего p-значения
    return 2 * (1 - tDistributionCDF(Math.abs(t), df));
}

// Аппроксимация CDF t-распределения (алгоритм из Numerical Recipes)
function tDistributionCDF(t: number, df: number): number {
    const x = (t + Math.sqrt(t ** 2 + df)) / (2 * Math.sqrt(t ** 2 + df));
    return regularizedBeta(x, df / 2, df / 2);
}

// Реализация регуляризованной неполной бета-функции
function regularizedBeta(x: number, a: number, b: number): number {
    const epsilon = 1e-10;
    const maxIterations = 1000;
    let bt =
        x === 0 || x === 1
            ? 0
            : Math.exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x));

    let fp = 1,
        c = 1,
        d = 1 - ((a + b) * x) / (a + 1);
    if (Math.abs(d) < epsilon) d = epsilon;
    d = 1 / d;
    let h = d;

    for (let m = 1; m <= maxIterations; m++) {
        const m2 = 2 * m;
        let aa = (m * (b - m) * x) / ((a + m2 - 1) * (a + m2));

        d = 1 + aa * d;
        if (Math.abs(d) < epsilon) d = epsilon;
        c = 1 + aa / c;
        if (Math.abs(c) < epsilon) c = epsilon;
        d = 1 / d;
        h *= d * c;

        aa = (-(a + m) * (a + b + m) * x) / ((a + m2) * (a + m2 + 1));

        d = 1 + aa * d;
        if (Math.abs(d) < epsilon) d = epsilon;
        c = 1 + aa / c;
        if (Math.abs(c) < epsilon) c = epsilon;
        d = 1 / d;
        const del = d * c;
        h *= del;

        if (Math.abs(del - 1) < epsilon) break;
    }

    return (bt * h) / a;
}

// Логарифм гамма-функции (аппроксимация Ланцоша)
function lgamma(x: number): number {
    const cof = [
        76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2,
        -0.5395239384953e-5,
    ];

    let ser = 1.000000000190015;
    let tmp = x + 5.5;
    tmp -= (x + 0.5) * Math.log(tmp);

    for (let j = 0; j < 6; j++) {
        ser += cof[j] / (x + j + 1);
    }

    return -tmp + Math.log((2.5066282746310005 * ser) / x);
}

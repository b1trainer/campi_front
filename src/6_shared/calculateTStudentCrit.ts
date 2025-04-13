interface CriticalValue {
    df: number;
    value: number;
}

interface TDistributionTable {
    alpha_levels: {
        '0.10': CriticalValue[];
        '0.05': CriticalValue[];
        '0.01': CriticalValue[];
        '0.001': CriticalValue[];
    };
}

const CRIT_TABLE: TDistributionTable = {
    alpha_levels: {
        '0.10': [
            { df: 1, value: 6.314 },
            { df: 2, value: 2.92 },
            { df: 3, value: 2.353 },
            { df: 4, value: 2.132 },
            { df: 5, value: 2.015 },
            { df: 6, value: 1.943 },
            { df: 7, value: 1.895 },
            { df: 8, value: 1.86 },
            { df: 9, value: 1.833 },
            { df: 10, value: 1.812 },
            { df: 15, value: 1.753 },
            { df: 20, value: 1.725 },
            { df: 30, value: 1.697 },
            { df: 40, value: 1.684 },
            { df: 60, value: 1.671 },
            { df: 120, value: 1.658 },
            { df: 1000, value: 1.645 },
        ],
        '0.05': [
            { df: 1, value: 12.706 },
            { df: 2, value: 4.303 },
            { df: 3, value: 3.182 },
            { df: 4, value: 2.776 },
            { df: 5, value: 2.571 },
            { df: 6, value: 2.447 },
            { df: 7, value: 2.365 },
            { df: 8, value: 2.306 },
            { df: 9, value: 2.262 },
            { df: 10, value: 2.228 },
            { df: 15, value: 2.131 },
            { df: 20, value: 2.086 },
            { df: 30, value: 2.042 },
            { df: 40, value: 2.021 },
            { df: 60, value: 2.0 },
            { df: 120, value: 1.98 },
            { df: 1000, value: 1.96 },
        ],
        '0.01': [
            { df: 1, value: 63.657 },
            { df: 2, value: 9.925 },
            { df: 3, value: 5.841 },
            { df: 4, value: 4.604 },
            { df: 5, value: 4.032 },
            { df: 6, value: 3.707 },
            { df: 7, value: 3.499 },
            { df: 8, value: 3.355 },
            { df: 9, value: 3.25 },
            { df: 10, value: 3.169 },
            { df: 15, value: 2.947 },
            { df: 20, value: 2.845 },
            { df: 30, value: 2.75 },
            { df: 40, value: 2.704 },
            { df: 60, value: 2.66 },
            { df: 120, value: 2.617 },
            { df: 1000, value: 2.576 },
        ],
        '0.001': [
            { df: 1, value: 636.619 },
            { df: 2, value: 31.599 },
            { df: 3, value: 12.924 },
            { df: 4, value: 8.61 },
            { df: 5, value: 6.869 },
            { df: 6, value: 5.959 },
            { df: 7, value: 5.408 },
            { df: 8, value: 5.041 },
            { df: 9, value: 4.781 },
            { df: 10, value: 4.587 },
            { df: 15, value: 4.073 },
            { df: 20, value: 3.85 },
            { df: 30, value: 3.646 },
            { df: 40, value: 3.551 },
            { df: 60, value: 3.46 },
            { df: 120, value: 3.373 },
            { df: 1000, value: 3.291 },
        ],
    },
};

export function determineSignificanceLevel(tStat: number, df: number, table: TDistributionTable): string {
    if (df < 1) throw new Error('Степени свободы должны быть ≥ 1');

    const alphaLevels: Array<keyof TDistributionTable['alpha_levels']> = ['0.001', '0.01', '0.05', '0.10'];

    const absT = Math.abs(tStat);

    for (const alpha of alphaLevels) {
        const criticalValue = findCriticalValue(table.alpha_levels[alpha], df);
        if (absT >= criticalValue) {
            return `p < ${alpha}`;
        }
    }

    return 'p > 0.10';
}

// Вспомогательная функция для поиска критического значения
function findCriticalValue(values: CriticalValue[], targetDf: number): number {
    let closestValue = values[0].value;
    let maxValidDf = -Infinity;

    for (const entry of values) {
        if (entry.df <= targetDf && entry.df > maxValidDf) {
            closestValue = entry.value;
            maxValidDf = entry.df;
        }
    }

    return closestValue;
}

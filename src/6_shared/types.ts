export type BtnColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

export type DataTypeIncrease = {
    stimulus: number;
    hue: number;
    hueIncrease: number;
    hueDiff: number;
    saturation: number;
    saturationDiff: number;
    lightness: number;
    lightnessDiff: number;
    errors: number;
    testTime: number;
};

export type UserData = {
    userId: string;
    age: string;
    sex: string;
    cataract: string;
    colorWork: string;
    neurologyDisease: string;
};

export type UserDataIncrease = {
    userId: string;
    data: DataTypeIncrease[];
};

export type DataTypeDecrease = {
    stimulus: number;
    hue: number;
    hueDecrease: number;
    hueDiff: number;
    saturation: number;
    saturationDiff: number;
    lightness: number;
    lightnessDiff: number;
    testTime: number;
};

export type UserDataDecrease = {
    userId: string;
    data: DataTypeDecrease[];
};

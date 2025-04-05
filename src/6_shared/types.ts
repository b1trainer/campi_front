export type BtnColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

export interface User {
    age: string;
    visionLevel: string;
}

export type DataTypeIncrease = {
    stimul: number;
    H: number;
    ['H+']: number;
    ['dH+']: number;
    ['S+']: number;
    ['dS+']: number;
    ['L+']: number;
    ['dL+']: number;
    ERR: number;
    ['t+']: number;
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
    stimul: number;
    H: number;
    ['H-']: number;
    ['dH-']: number;
    ['S-']: number;
    ['dS-']: number;
    ['L-']: number;
    ['dL-']: number;
    ['t-']: number;
};

export type UserDataDecrease = {
    userId: string;
    data: DataTypeDecrease[];
};

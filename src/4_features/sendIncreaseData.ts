import { DataTypeIncrease } from '../6_shared/types';
import { appInstance } from './instance';

export const sendIncreaseData = (userId: string, decreaseData: DataTypeIncrease) => {
    appInstance.request({
        method: 'POST',
        url: '/rest/v1/save/increaseData',
        data: { userId: userId, ...decreaseData },
    });
};

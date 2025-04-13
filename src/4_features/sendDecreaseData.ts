import { DataTypeDecrease } from '../6_shared/types';
import { appInstance } from './instance';

export const sendDecreaseData = (userId: string, decreaseData: DataTypeDecrease) => {
    appInstance.request({
        method: 'POST',
        url: '/rest/v1/save/decreaseData',
        data: { userId: userId, ...decreaseData },
    });
};

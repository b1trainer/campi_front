import { UserData } from '../6_shared/types';
import { appInstance } from './instance';

export const sendUserData = (userData: UserData) => {
    appInstance.request({
        method: 'POST',
        url: '/rest/v1/user',
        data: userData,
    });
};

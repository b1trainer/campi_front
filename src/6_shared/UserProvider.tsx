import { createContext, memo, useMemo, useState } from 'react';
import noop from 'lodash/noop';
import { User } from './types';
import { v4 as uuidv4 } from 'uuid';

export interface IUserContext {
    userId: string;
}

export const UserContext = createContext<IUserContext>({ userId: '' });

type ProviderProps = {
    children?: React.ReactNode;
};

const UserProvider: React.FC<ProviderProps> = memo((props) => {
    const { children } = props;
    const userId = uuidv4();

    const value = useMemo(() => ({ userId }), [userId]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
});

export default UserProvider;

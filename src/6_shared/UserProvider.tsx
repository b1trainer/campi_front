import { createContext, memo, useMemo, useState } from 'react';
import noop from 'lodash/noop';
import { DataTypeDecrease, DataTypeIncrease, UserData } from './types';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export type AllData = Omit<UserData, 'userId'> & { dataIncrease: DataTypeIncrease[]; dataDecrease: DataTypeDecrease[] };

export const DEFAULT_DATA_START: AllData = {
    age: '',
    sex: '',
    cataract: '',
    colorWork: '',
    neurologyDisease: '',
    dataIncrease: [],
    dataDecrease: [],
};

export interface IUserContext {
    userId: string;

    allData: AllData;
    setAllData: (data: AllData) => void;

    useSendData: () => void;

    useSetData: (data: Partial<AllData>) => void;
}

export const UserContext = createContext<IUserContext>({
    userId: '',
    allData: DEFAULT_DATA_START,
    setAllData: noop,
    useSendData: noop,
    useSetData: noop,
});

type ProviderProps = {
    children?: React.ReactNode;
};

export const appInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

const postUserData = (data: AllData) =>
    appInstance.request({
        method: 'POST',
        url: '/rest/userdata',
        data: data,
    });

const UserProvider: React.FC<ProviderProps> = memo((props) => {
    const { children } = props;
    const userId = uuidv4();

    const [allData, setAllData] = useState<AllData>(DEFAULT_DATA_START);

    const useSetData = (data: Partial<AllData>) => {
        setAllData((prev) => ({
            ...prev,
            ...data,
            dataDecrease: [...prev.dataDecrease, ...(data.dataDecrease ?? [])],
            dataIncrease: [...prev.dataIncrease, ...(data.dataIncrease ?? [])],
        }));
    };

    const useSendData = () => {
        postUserData(allData);
    };

    const value = useMemo(
        () => ({
            userId,
            allData,
            setAllData,
            useSendData,
            useSetData,
        }),
        [userId]
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
});

export default UserProvider;

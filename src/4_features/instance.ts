import axios from 'axios';

export const appInstance = axios.create({
    baseURL: 'http://localhost:8081',
    headers: {
        'Content-Type': 'application/json',
    },
});

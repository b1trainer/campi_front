import { createHashRouter, Navigate } from 'react-router';
import Layout from '../layout/Layout';
import StartPage from '../../2_pages/StartPage';
import CampimetryTest from '../../2_pages/CampimetryTest';
import CampimetryTest_2 from '../../2_pages/CampimetryTest_2';

export const router = createHashRouter([
    {
        path: '/',
        element: <Navigate to='/start' replace />,
    },
    {
        path: '*',
        element: <Layout />,
        children: [
            {
                path: 'start',
                element: <StartPage />,
            },
            {
                path: 'test',
                element: <CampimetryTest />,
            },
            {
                path: 'test_2',
                element: <CampimetryTest_2 />,
            },
        ],
    },
]);

import { memo, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './router/router';
import Stub from './layout/Stub';

const Entrypoint: React.FC = memo((props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return loading ? <Stub /> : <RouterProvider router={router} />;
});

export default Entrypoint;

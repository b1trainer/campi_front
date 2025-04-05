import { memo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Workspace from '../../3_widgets/Workspace';

const Layout: React.FC = memo(() => {
    return (
        <>
            <CssBaseline />
            <Workspace />
        </>
    );
});

export default Layout;

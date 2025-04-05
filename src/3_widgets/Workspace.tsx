import Box from '@mui/material/Box';
import { memo } from 'react';
import { Outlet } from 'react-router';

const Workspace: React.FC = memo((props) => {
    return (
        <Box
            sx={{
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            <Box sx={{ height: '100%' }}>
                <Outlet />
            </Box>
        </Box>
    );
});

export default Workspace;

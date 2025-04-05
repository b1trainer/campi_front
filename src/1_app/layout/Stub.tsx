import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { memo } from 'react';

const Stub: React.FC = memo(() => {
    return (
        <Box
            sx={{
                overflow: 'hidden',
                width: 'calc(100vw - 45px)',
                height: 'calc(100vh - 45px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress size={45} color='inherit' disableShrink />
        </Box>
    );
});

export default Stub;

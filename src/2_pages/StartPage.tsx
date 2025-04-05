import { Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router';

const StartPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ padding: '5px' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 10px)',
                }}
            >
                <Button onClick={() => navigate('/test')}>Campimetry Test</Button>
            </Box>
        </Box>
    );
};

export default StartPage;

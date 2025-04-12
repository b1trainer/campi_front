import { useState, useEffect, FC, useContext } from 'react';
import { Button, Container, Box, Stack, IconButton, Grid, Typography } from '@mui/material';
import { ArrowForward, Add, Remove } from '@mui/icons-material';
import { LinearProgressWithLabel } from '../3_widgets/LinearProgress';
import { ICONS, TEST_CONFIGURATION } from './config';
import { ConfirmContext } from '../6_shared/ConfirmProvider';
import { useNavigate } from 'react-router';
import { DEFAULT_DATA_START, UserContext } from '../6_shared/UserProvider';
import { UserDataDecrease } from '../6_shared/types';

const Test2Text = () => (
    <>
        <Typography variant='h4' style={{ paddingBottom: '10px' }}>
            Этап 2
        </Typography>
        <Typography variant='body1'>
            На данном этапе необходимо убавлять оттенок пока Вы не сможете больше различать изображенную фигуру
        </Typography>
    </>
);

const EndText = () => (
    <>
        <Typography variant='h5' style={{ paddingBottom: '10px' }}>
            Спасибо за прохождение теста!
        </Typography>
    </>
);

const CampimetryTest_2: FC = () => {
    const { userId, useSendData, useSetData } = useContext(UserContext);

    const navigate = useNavigate();
    const { confirm } = useContext(ConfirmContext);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentHue, setCurrentHue] = useState(TEST_CONFIGURATION[0].hue);
    const [currentSaturation, setCurrentSaturation] = useState(TEST_CONFIGURATION[0].saturation);
    const [currentLightness, setCurrentLightness] = useState(TEST_CONFIGURATION[0].lightness);

    const [targetImageIndex, setTargetImageIndex] = useState(0);

    const [progress, setProgress] = useState(0);

    const [stimul, setStimul] = useState(0);
    const [startTime, setStartTime] = useState(0);

    useEffect(() => {
        const randomImageIndex = Math.floor(Math.random() * ICONS.length);
        setTargetImageIndex(randomImageIndex);

        let changedHue = 0;
        let changedLight = 0;

        if (TEST_CONFIGURATION[currentIndex].changedValue === 'hue') changedHue = 30;
        else changedLight = 20;

        setCurrentHue(TEST_CONFIGURATION[currentIndex].hue + changedHue);
        setCurrentSaturation(TEST_CONFIGURATION[currentIndex].saturation);
        setCurrentLightness(TEST_CONFIGURATION[currentIndex].lightness + changedLight);
    }, [currentIndex]);

    const handleChange = (step: number) => {
        setStimul((prev) => prev - step);
        switch (TEST_CONFIGURATION[currentIndex].changedValue) {
            case 'hue':
                setCurrentHue((prev) => {
                    const newValue = prev + step;
                    return newValue < 0 ? 360 + newValue : newValue % 360;
                });
                break;
            case 'saturation':
                setCurrentSaturation((prev) => {
                    const newValue = prev + step;
                    return newValue < 0 ? 360 + newValue : newValue % 360;
                });
                break;
            case 'lightness':
                setCurrentLightness((prev) => {
                    const newValue = prev + step;
                    return newValue < 0 ? 360 + newValue : newValue % 360;
                });
                break;
            default:
                return;
        }
    };

    const handleNextColor = () => {
        useSetData({
            dataDecrease: [
                {
                    stimul: stimul,
                    H: TEST_CONFIGURATION[currentIndex].hue,
                    ['H-']: currentHue,
                    ['dH-']: currentHue - TEST_CONFIGURATION[currentIndex].hue,
                    ['S-']: currentSaturation,
                    ['dS-']: currentSaturation - TEST_CONFIGURATION[currentIndex].saturation,
                    ['L-']: currentLightness,
                    ['dL-']: currentLightness - TEST_CONFIGURATION[currentIndex].lightness,
                    ['t-']: new Date().getTime() - startTime,
                },
            ],
        });

        setProgress((prev) => prev + 100 / TEST_CONFIGURATION.length);
        setCurrentIndex((prev) => (prev + 1) % TEST_CONFIGURATION.length);
        setStimul(0);
        setStartTime(new Date().getTime());
    };

    useEffect(() => {
        setTimeout(() => {
            confirm({ content: <Test2Text />, confirmationText: 'Начать' }).then(() =>
                setStartTime(new Date().getTime())
            );
        }, 500);
    }, []);

    useEffect(() => {
        if (currentIndex === 3) {
            confirm({ content: <EndText />, confirmationText: 'Завершить' }).then(() => {
                useSendData();
                useSetData(DEFAULT_DATA_START);
                navigate('/start');
            });
        }
    }, [currentIndex]);

    const background = `hsl(${TEST_CONFIGURATION[currentIndex].hue}, ${TEST_CONFIGURATION[currentIndex].saturation}%, ${TEST_CONFIGURATION[currentIndex].lightness}%)`;
    const targetColor = `hsl(${currentHue}, ${currentSaturation}%, ${currentLightness}%)`;
    const textColor = TEST_CONFIGURATION[currentIndex].hue > 180 ? '#fff' : '#000';

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={progress} />
            </Box>
            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    minHeight: '100vh',
                    backgroundColor: background,
                    py: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' gap={4}>
                    <Box
                        sx={{
                            backgroundColor: targetColor,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {ICONS[targetImageIndex].icon({
                            style: {
                                width: '250px',
                                height: '250px',
                                borderRadius: 2,
                                objectFit: 'cover',
                                color: background,
                            },
                        })}
                    </Box>

                    <Stack direction='row' spacing={2} alignItems='center'>
                        <IconButton
                            onClick={() => handleChange(-1)}
                            size='large'
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
                            }}
                        >
                            <Remove fontSize='large' sx={{ color: textColor }} />
                        </IconButton>
                        <IconButton
                            onClick={() => handleChange(1)}
                            size='large'
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
                            }}
                            disabled={
                                TEST_CONFIGURATION[currentIndex].changedValue === 'hue'
                                    ? currentHue === TEST_CONFIGURATION[currentIndex].hue + 30
                                    : currentLightness === TEST_CONFIGURATION[currentIndex].lightness + 20
                            }
                        >
                            <Add fontSize='large' sx={{ color: textColor }} />
                        </IconButton>
                    </Stack>

                    <Stack direction='row' spacing={2}>
                        <Button
                            variant='contained'
                            onClick={handleNextColor}
                            endIcon={<ArrowForward />}
                            sx={{
                                px: 4,
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
                                color: textColor,
                            }}
                        >
                            Next step
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </>
    );
};

export default CampimetryTest_2;

import { useState, useEffect, FC, useContext } from 'react';
import { Button, Container, Box, Stack, IconButton, Grid } from '@mui/material';
import { ArrowForward, Add, Remove } from '@mui/icons-material';
import { LinearProgressWithLabel } from '../3_widgets/LinearProgress';
import CampimetryStartContent from '../3_widgets/CampimetryStartContent';
import { ICONS, TEST_CONFIGURATION } from './config';
import { ConfirmContext } from '../6_shared/ConfirmProvider';
import { useSnackbar } from 'notistack';
import createSnackbarAction from '../6_shared/createSnackbarAction';
import { useNavigate } from 'react-router';
import { UserContext } from '../6_shared/UserProvider';
import { UserDataIncrease } from '../6_shared/types';

const CampimetryTest: FC = () => {
    const { userId } = useContext(UserContext);

    const [startData, setStartData] = useState({
        age: '',
        sex: '',
        cataract: '',
        colorWork: '',
        neurologyDisease: '',
    });

    const [userData, setUserData] = useState<UserDataIncrease>({
        userId: userId,
        data: [],
    });

    const navigate = useNavigate();
    const { confirm } = useContext(ConfirmContext);

    const [currentHue, setCurrentHue] = useState(TEST_CONFIGURATION[0].hue);
    const [currentSaturation, setSaturation] = useState(TEST_CONFIGURATION[0].saturation);
    const [currentLightness, setCurrentLightness] = useState(TEST_CONFIGURATION[0].lightness);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [targetImageIndex, setTargetImageIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const [stimul, setStimul] = useState(0);
    const [errors, setErrors] = useState(0);
    const [startTime, setStartTime] = useState(0);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const randomImageIndex = Math.floor(Math.random() * ICONS.length);
        setTargetImageIndex(randomImageIndex);

        setCurrentHue(TEST_CONFIGURATION[currentIndex].hue);
        setSaturation(TEST_CONFIGURATION[currentIndex].saturation);
        setCurrentLightness(TEST_CONFIGURATION[currentIndex].lightness);

        setSelectedImage(null);
    }, [currentIndex]);

    const handleChange = (step: number) => {
        setStimul((prev) => prev + step);
        switch (TEST_CONFIGURATION[currentIndex].changedValue) {
            case 'hue':
                setCurrentHue((prev) => {
                    const newValue = prev + step;
                    return newValue < 0 ? 360 + newValue : newValue % 360;
                });
                break;
            case 'saturation':
                setSaturation((prev) => {
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
        const currentMeasure = {
            stimul: stimul,
            H: TEST_CONFIGURATION[currentIndex].hue,
            ['H+']: currentHue,
            ['dH+']: currentHue - TEST_CONFIGURATION[currentIndex].hue,
            ['S+']: currentSaturation,
            ['dS+']: currentSaturation - TEST_CONFIGURATION[currentIndex].saturation,
            ['L+']: currentLightness,
            ['dL+']: currentLightness - TEST_CONFIGURATION[currentIndex].lightness,
            ERR: errors,
            ['t+']: new Date().getTime() - startTime,
        };
        setUserData((prev) => ({
            ...prev,
            data: [...prev.data, currentMeasure],
        }));

        setProgress((prev) => prev + 100 / TEST_CONFIGURATION.length);
        setCurrentIndex((prev) => (prev + 1) % TEST_CONFIGURATION.length);
        setStimul(0);
        setErrors(0);
        setStartTime(new Date().getTime());
    };

    useEffect(() => {
        setTimeout(() => {
            confirm({
                content: <CampimetryStartContent setData={setStartData} />,
                confirmationText: 'Начать',
            }).then(() => setStartTime(new Date().getTime()));
        }, 500);
    }, []);

    useEffect(() => {
        if (currentIndex === TEST_CONFIGURATION.length - 1) {
            // Sending first part of testing user
            console.log('startData', { ...startData, userId: userId });

            console.log('userData', userData);
            navigate('/test_2');
        }
    }, [currentIndex]);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const addError = () => {
        setErrors((prev) => prev + 1);
        enqueueSnackbar(`Попробуйте снова!`, {
            persist: true,
            variant: 'warning',
            action: createSnackbarAction(closeSnackbar),
        });
    };

    const isCorrectImage = selectedImage === ICONS[targetImageIndex].id;

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
                                width: '300px',
                                height: '300px',
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
                            disabled={
                                TEST_CONFIGURATION[currentIndex].changedValue === 'hue'
                                    ? currentHue === TEST_CONFIGURATION[currentIndex].hue
                                    : currentLightness === TEST_CONFIGURATION[currentIndex].lightness
                            }
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
                        >
                            <Add fontSize='large' sx={{ color: textColor }} />
                        </IconButton>
                    </Stack>

                    <Grid container spacing={2} justifyContent='center'>
                        {ICONS.map((icon, index) => (
                            <Grid item key={index}>
                                <icon.icon
                                    onClick={() => setSelectedImage(icon.id)}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        cursor: 'pointer',
                                        border: selectedImage === icon.id ? '3px solid' : 'none',
                                        borderRadius: 1,
                                        objectFit: 'cover',
                                        opacity: selectedImage === icon.id ? 1 : 0.7,
                                        transition: 'all 0.2s ease',
                                        color: textColor,
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Stack direction='row' spacing={2}>
                        <Button
                            variant='contained'
                            onClick={isCorrectImage ? handleNextColor : addError}
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

export default CampimetryTest;

import { Container, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { UserData } from '../6_shared/types';

interface ICampimetryStartContent {
    setData: (data: Omit<UserData, 'userId'>) => void;
}

const CampimetryStartContent: React.FC<ICampimetryStartContent> = (props) => {
    const { setData } = props;

    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [cataract, setCataract] = useState('');
    const [colorWork, setColorWork] = useState('');
    const [neurologyDisease, setNeurologyDisease] = useState('');

    useEffect(() => {
        setData({ age: age, sex: sex, cataract: cataract, colorWork: colorWork, neurologyDisease: neurologyDisease });
    }, [age, sex, cataract, colorWork, neurologyDisease]);

    return (
        <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
            <Typography variant='h4' gutterBottom>
                ЦВЕТОВАЯ КАМПИМЕТРИЯ
            </Typography>

            <Typography variant='body1' paragraph sx={{ mb: 3 }}>
                Пожалуйста, перед началом тестирования заполните форму
            </Typography>

            <Box component='form'>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label='Возраст'
                            name='age'
                            type='number'
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel>Пол</InputLabel>
                            <Select name='sex' value={sex} label='Пол' onChange={(e) => setSex(e.target.value)}>
                                <MenuItem value='male'>Мужской</MenuItem>
                                <MenuItem value='female'>Женский</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel>Катаракта</InputLabel>
                            <Select
                                name='cataract'
                                value={cataract}
                                label='Катаракта'
                                onChange={(e) => setCataract(e.target.value)}
                            >
                                <MenuItem value='1'>Есть</MenuItem>
                                <MenuItem value='0'>Нет</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel>Работа с цветом (художник / фотограф / дизайнер)</InputLabel>
                            <Select
                                name='colorWork'
                                value={colorWork}
                                label='Работа с цветом'
                                onChange={(e) => setColorWork(e.target.value)}
                            >
                                <MenuItem value='1'>Да</MenuItem>
                                <MenuItem value='0'>Нет</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel>Неврологические заболевания</InputLabel>
                            <Select
                                name='neurology_disease'
                                value={neurologyDisease}
                                label='Неврологические заболевания'
                                onChange={(e) => setNeurologyDisease(e.target.value)}
                            >
                                <MenuItem value='1'>Есть</MenuItem>
                                <MenuItem value='0'>Нет</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            <Typography variant='body2' style={{ fontWeight: 600 }} paragraph sx={{ mt: 3 }}>
                Вся собираемая информация обезличена и строго конфиденциальна
            </Typography>
        </Container>
    );
};

export default CampimetryStartContent;

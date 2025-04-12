import { Container, List, ListItem, Typography } from '@mui/material';

const CampimetryStartContent_1: React.FC = (props) => {
    return (
        <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
            <Typography variant='h4' gutterBottom>
                ЦВЕТОВАЯ КАМПИМЕТРИЯ
            </Typography>

            <Typography variant='body1' paragraph sx={{ mb: 3 }}>
                Цветовая кампиметрия — это способ измерить, как люди различают цвета на экране компьютера
            </Typography>
            <Typography variant='body1' paragraph sx={{ mb: 3 }}>
                Метод основан на вычислении дифференциальных порогов, определяющих самое маленькое различие между двумя
                цветами, которое человек может заметить
            </Typography>
            <Typography variant='body1'>Исследование цветовоприятия может применяется для:</Typography>
            <List>
                <ListItem>
                    <Typography variant='body1'>
                        * Диагностики заболеваний (шизофрения, БАР), аффективных состояний, склонности к депрессии, типа
                        нервной системы и вегетативной регуляции
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant='body1'>
                        * Анализа изменений состояния в разных условиях (работа, терапия, лечение)
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant='body1'>* Выявления стрессовых факторов</Typography>
                </ListItem>
                <ListItem>
                    <Typography variant='body1'>* Подбора цветов-компенсаторов для коррекции физиологии</Typography>
                </ListItem>
            </List>
            <Typography variant='body1' paragraph sx={{ mb: 3 }}>
                Процедура тестирования состоит из 2 этапов. Каждый этап состоит из 21 шага
            </Typography>
            <Typography variant='body1' paragraph sx={{ mb: 3 }}>
                На первом этапе Вам необходимо прибавлять оттенок с помощью соответствующих кнопок "+" и "-" до тех пор,
                когда Вы сможете различить и правильно выбрать изображенную на экране фигуру
            </Typography>
            <Typography variant='body1' paragraph sx={{ mb: 3 }}>
                На втором этапе Вам необходимо убавлять оттенок с помощью соответствующих кнопок "+" и "-" до тех пор,
                пока Вы не сможете больше различать изображенную на экране фигуру
            </Typography>
        </Container>
    );
};

export default CampimetryStartContent_1;

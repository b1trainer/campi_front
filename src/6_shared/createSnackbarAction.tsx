import { SnackbarAction, SnackbarKey } from 'notistack';
import { withIcon } from './buttonEnchanters';
import CloseIcon from '@mui/icons-material/Close';

export const CloseButton = withIcon(CloseIcon, { arrow: true });

const createSnackbarAction =
    (onCLick: (key: SnackbarKey) => void): SnackbarAction =>
    (key: SnackbarKey) =>
        <CloseButton aria-label='close' onClick={() => onCLick(key)} sx={{ color: 'white' }} />;

export default createSnackbarAction;

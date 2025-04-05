import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppTheme from './theme';
import Entrypoint from './Entrypoint';
import UserProvider from '../6_shared/UserProvider';
import ConfirmProvider from '../6_shared/ConfirmProvider';
import { SnackbarProvider } from 'notistack';

export default function App(props: { disableCustomTheme?: boolean }) {
    return (
        <AppTheme {...props}>
            <SnackbarProvider>
                <UserProvider>
                    <ConfirmProvider>
                        <Entrypoint />
                    </ConfirmProvider>
                </UserProvider>
            </SnackbarProvider>
        </AppTheme>
    );
}

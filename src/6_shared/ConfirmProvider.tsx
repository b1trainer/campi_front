import { ButtonProps } from '@mui/material/Button';
import { DialogProps } from '@mui/material/Dialog';
import { DialogActionsProps } from '@mui/material/DialogActions';
import { DialogContentProps } from '@mui/material/DialogContent';
import { DialogTitleProps } from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import { createContext, memo, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import noop from 'lodash/noop';
import isNumber from 'lodash/isNumber';
import ConfirmationDialog from './ConfirmationDialog';
import useTimeout from './useTimeout';

export interface ConfirmOptions {
    title?: React.ReactNode;
    titleProps?: DialogTitleProps;
    description?: React.ReactNode;
    content?: React.ReactNode | null;
    contentProps?: DialogContentProps;
    confirmationText?: React.ReactNode;
    cancellationText?: React.ReactNode;
    dialogProps?: Omit<DialogProps, 'open'>;
    dialogActionsProps?: DialogActionsProps;
    confirmationButtonProps?: ButtonProps;
    cancellationButtonProps?: ButtonProps;
    allowClose?: boolean;
    confirmationKeyword?: string;
    hideCancelButton?: boolean;
    buttonOrder?: string[];
}

export interface IConfirmContext {
    confirm: (options?: ConfirmOptions) => Promise<void>;
}

export const ConfirmContext = createContext<IConfirmContext>({ confirm: noop as () => Promise<void> });

const ConfirmProvider: React.FC<PropsWithChildren> = memo((props) => {
    const { children } = props;

    const [options, setOptions] = useState<ConfirmOptions>(DEFAULT_OPTIONS);
    const [resolveReject, setResolveReject] = useState<Array<() => void>>([]);

    const theme = useTheme();
    const timeout = useTimeout();

    const transitionDuration = useMemo(() => {
        const transitionCustom =
            options.dialogProps?.transitionDuration &&
            (isNumber(options.dialogProps.transitionDuration)
                ? options.dialogProps.transitionDuration
                : options.dialogProps.transitionDuration.exit);

        return transitionCustom ?? theme.transitions.duration.leavingScreen;
    }, [options.dialogProps?.transitionDuration, theme.transitions.duration.leavingScreen]);

    const confirm = useCallback(
        (options: ConfirmOptions = {}) =>
            new Promise<void>((resolve, reject) => {
                setOptions({
                    ...DEFAULT_OPTIONS,
                    ...options,
                });
                setResolveReject([resolve, reject]);
            }),
        []
    );

    const handleClose = useCallback(() => setResolveReject([]), []);

    const handleCancel = useCallback(() => {
        const [_, reject] = resolveReject;

        timeout(() => reject(), transitionDuration);
        handleClose();
    }, [resolveReject, handleClose, timeout, transitionDuration]);

    const handleConfirm = useCallback(() => {
        const [resolve] = resolveReject;

        timeout(() => resolve(), transitionDuration);
        handleClose();
    }, [resolveReject, handleClose, timeout, transitionDuration]);

    const value = useMemo(() => ({ confirm }), [confirm]);

    return (
        <>
            <ConfirmContext.Provider value={value}>{children}</ConfirmContext.Provider>
            <ConfirmationDialog
                open={resolveReject.length > 0}
                options={options}
                onClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </>
    );
});

export default ConfirmProvider;

export const DEFAULT_OPTIONS: ConfirmOptions = {
    title: '',
    description: '',
    content: null,
    confirmationText: 'Ок',
    cancellationText: 'Отмена',
    dialogProps: {},
    dialogActionsProps: {},
    confirmationButtonProps: {
        color: 'success',
    },
    cancellationButtonProps: {
        color: 'inherit',
    },
    titleProps: {},
    contentProps: {},
    allowClose: false,
    hideCancelButton: true,
    buttonOrder: ['cancel', 'confirm'],
};

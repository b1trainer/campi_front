import { ConfirmOptions } from './ConfirmProvider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material/styles';
import { useMemo } from 'react';

export interface IConfirmationDialogProps {
    open: boolean;
    options: ConfirmOptions;
    onClose: () => void;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmationDialog: React.FC<IConfirmationDialogProps> = (props) => {
    const { open, options, onClose, onCancel, onConfirm } = props;
    const {
        title,
        description,
        content,
        confirmationText,
        cancellationText,
        dialogProps,
        dialogActionsProps,
        confirmationButtonProps,
        cancellationButtonProps,
        titleProps,
        contentProps,
        allowClose,
        confirmationKeyword,
        hideCancelButton,
        buttonOrder,
    } = options;

    const dialogActions = useMemo(
        () =>
            buttonOrder?.map((buttonType) => {
                if (buttonType === 'cancel') {
                    return (
                        !hideCancelButton && (
                            <Button key='cancel' {...cancellationButtonProps} onClick={onCancel}>
                                {cancellationText}
                            </Button>
                        )
                    );
                }

                if (buttonType === 'confirm') {
                    return (
                        <Button key='confirm' color='success' {...confirmationButtonProps} onClick={onConfirm}>
                            {confirmationText}
                        </Button>
                    );
                }

                throw new Error(`Supported button types are only "confirm" and "cancel", got: ${buttonType}`);
            }),
        [
            buttonOrder,
            confirmationText,
            cancellationText,
            confirmationButtonProps,
            cancellationButtonProps,
            hideCancelButton,
            onCancel,
            onConfirm,
        ]
    );

    return (
        <Dialog fullWidth {...dialogProps} open={open} onClose={allowClose ? onClose : undefined}>
            {title && <DialogTitle {...titleProps}>{title}</DialogTitle>}
            {content ? (
                <DialogContent {...contentProps} className={contentProps?.className}>
                    {content}
                </DialogContent>
            ) : description ? (
                <DialogContent {...contentProps} className={contentProps?.className}>
                    <DialogContentText>{description}</DialogContentText>
                </DialogContent>
            ) : (
                confirmationKeyword && <DialogContent {...contentProps}></DialogContent>
            )}
            <DialogActions {...dialogActionsProps}>{dialogActions}</DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;

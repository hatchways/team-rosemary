import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

const AppDialog = ({
    isOpen,
    size,
    handleClose,
    title,
    subtitle,
    children,
}) => {
    const classes = useStyles();
    return (
        <div>
            <Dialog
                id="appDialog"
                fullWidth
                maxWidth={size}
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="appDialog"
            >
                <DialogTitle>
                    {title}
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>{subtitle}</DialogContentText>
                    {children}
                </DialogContent>
            </Dialog>
        </div>
    );
};
export default AppDialog;

import React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {setAppError} from "../../../../bll/reducers/app-reducer";
import {useAppDispatch, useAppSelector} from "../../../../bll/store";
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorSnackbar() {
    const dispatch = useAppDispatch()
    const error = useAppSelector<string | null>(state => state.appReducer.error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppError(null))
    };

    return (
            <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
    );
}

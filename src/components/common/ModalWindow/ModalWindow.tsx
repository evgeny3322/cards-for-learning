import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type ModalWindowPropsType = {
    displayModal: boolean
    title: string
    onAnswerCallback: (ans: boolean) => void
    onOverlayClose: () => void
}

const ModalWindow: React.FC<ModalWindowPropsType> = React.memo( ({displayModal, title, onAnswerCallback, onOverlayClose}) => {
    // console.log('ModalWindow rendered');
    const onConfirmHandler = () => {
        onAnswerCallback(true);
    }
    const onCancelHandler = () => {
        onAnswerCallback(false);
    }

    const modalStyle = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        minWidth: '280px',
        maxWidth: '320px',
        p: 3,
    };

    const buttonsWrapperStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        width: '100%',
    }

    return (
        <div>
            <Modal open={displayModal} onClose={onOverlayClose}>
                <Paper elevation={10} sx={modalStyle}>
                    <Typography variant="body1" gutterBottom component="div">
                        {title}
                    </Typography>
                    <Box sx={buttonsWrapperStyle}>
                        <Button variant="contained" color="success" onClick={onConfirmHandler}>Ok</Button>
                        <Button variant="contained" color="error" onClick={onCancelHandler}>Cancel</Button>
                    </Box>
                </Paper>
            </Modal>
        </div>
    )
})

export default ModalWindow;


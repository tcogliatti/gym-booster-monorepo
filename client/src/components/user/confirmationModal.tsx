import React from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ConfirmationModal(props: any) {
    const { open, handleCloseModal, handleClikConfirmationModal } = props

    const handleClickConfirmation = () => {
        handleClikConfirmationModal()
        handleCloseModal()
    }
    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
        >
            <Box sx={{ ...style, width: 350, borderRadius: '6px', padding: '26px', border: 'none' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <WarningAmberRoundedIcon sx={{ fontSize: '50px', color: 'FireBrick' }} />
                </Box>
                <Typography sx={{ textAlign: 'center', fontSize: '12px' }}>Estás a punto de modificar los datos de un usuario</Typography>
                <Typography sx={{ textAlign: 'center' }}>Esta acción no se puede deshacer</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
                    <Button variant="contained" onClick={handleCloseModal} startIcon={<ArrowBackIcon />}>Volver</Button>
                    <Button variant="outlined" color="error" type='submit' onClick={handleClikConfirmationModal} endIcon={<ThumbUpOffAltRoundedIcon />}> Confirmar </Button>
                </Box>
            </Box>
        </Modal>
    )
}


import React from 'react'
import { Box, Button, Modal } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// modal styles
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function ClientModal(props: any) {
    const { open, handleClose, user, handleIsClient } = props

    const handleChangeClient = () => {
        handleIsClient()
        handleClose()
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 400, borderRadius: '6px', paddingTop: '12px', border: 'none' }}>
                <form>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
                    <Button variant="contained" onClick={handleClose} startIcon={<ArrowBackIcon />}>Volver</Button>
                    <Button variant="outlined" color="error" type='submit' onClick={handleChangeClient} > Confirmar </Button>
                </Box>
                </form>
            </Box>
        </Modal>
    )
}

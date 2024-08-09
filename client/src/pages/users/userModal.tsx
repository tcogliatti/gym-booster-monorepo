import { Box, Button, Modal } from '@mui/material'
import { calculateAge } from '../../utils/calculateAge'
import { useState } from 'react';

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

export default function UserModal(props: any) {
    const {user, handleClose, open } = props


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 400 }}>
                {
                    !user
                        ? <h2 id="parent-modal-title">No se ha seleccionado un usuario</h2>
                        : <>
                            <h2 id="parent-modal-title">{`${user.first_name}, ${user.last_name}`}</h2>
                            <p id="parent-modal-description">{`e-mail: ${user.email}`}</p>
                            <p id="parent-modal-description">{`Edad: ${calculateAge(user.birth_date)}`}</p>
                            <p id="parent-modal-description">{`Dirección: ${user.address}`}</p>
                            <p id="parent-modal-description">{`email: ${user.first_name}`}</p>
                            <p id="parent-modal-description">{`email: ${user.first_name}`}</p>
                            <p id="parent-modal-description">{`email: ${user.first_name}`}</p>
                        </>
                }
                {/* <ChildModal /> */}
                <Button onClick={handleClose}>Volver</Button>
            </Box>
        </Modal>
    )
}

import { Box, Button, Modal, Typography } from '@mui/material'
import { calculateAge } from '../../utils/calculateAge'
import EditIcon from '@mui/icons-material/Edit';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateEditModalUser from './CreateEditModal/createEditModal';
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
    const { handleClose, open, user, handleRefreshUsers } = props
    const [isEditing, setIsEditing] = useState(false)

    const handleClickEdit = () => { setIsEditing(true) }
    const handleCloseModal = () => {
        setIsEditing(false)
        handleClose()
    }
   
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <>
            { !isEditing && 
                <Box sx={{ ...style, width: 400, borderRadius: '6px', paddingTop: '12px', border: 'none' }}>
                    {
                        !user
                            ? <h2 id="parent-modal-title">No se ha seleccionado un usuario</h2>
                            : <>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <h2 id="parent-modal-title">{`${user.first_name}, ${user.last_name}`}</h2>
                                    {/* <Avatar alt={`${user.first_name}, ${user.last_name}`} sx={{ border: '1px solid #4E4E4E', alignSelf: 'center', height: '60px', width: '60px', bgcolor: deepPurple[500] }} src="">{`${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}`}</Avatar> */}

                                </Box>
                                <hr color={'grey'} />
                                <Typography component={'p'}>{`e-mail: ${user.email}`}</Typography>
                                <p id="parent-modal-description">{`Edad: ${calculateAge(user.birth_date)}`}</p>
                                <p id="parent-modal-description">{`Dirección: ${user.address}`}</p>
                                <p id="parent-modal-description">{`Genero: ${user.gender ? user.gender.name : 'coso'}`}</p>
                                <p id="parent-modal-description">{`email: ${user.first_name}`}</p>
                                <p id="parent-modal-description">{`DNI: ${user.dni}`}</p>
                                {
                                    user.client
                                        ? <Typography component={'p'}>Es Cliente <FiberManualRecordIcon sx={{ color: '#3dc260' }} /></Typography>
                                        : <Typography component={'p'}>No es Cliente <FiberManualRecordIcon sx={{ color: '#c3d6c8' }} /></Typography>
                                }
                                {
                                    user.administrator
                                        ? <p id="parent-modal-description">{`DNI: ${user.administrator.name}`}</p>
                                        : <p id="parent-modal-description">{`El usuario no es administrador`}</p>
                                }
                            </>
                    }
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
                        <Button variant="contained" onClick={handleCloseModal} startIcon={<ArrowBackIcon />}>Volver</Button>
                        <Button variant="outlined" onClick={handleClickEdit} endIcon={<EditIcon />}>Editar </Button>
                    </Box>
                </Box>
            }
            {
                isEditing && <CreateEditModalUser user={user} handleCloseModal={handleCloseModal} handleRefreshUsers={handleRefreshUsers}/>
            }
            </>
        </Modal>
    )
}

import { Box, Button, ButtonGroup, Modal, Typography } from '@mui/material'
import { calculateAge } from '../../utils/calculateAge'
import EditIcon from '@mui/icons-material/Edit';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateEditModalUser from './CreateEditModal/createEditModal';
import { useState } from 'react';
import ClientModal from '../../components/client/clientModal'
import AdminModal from '../../components/administrator/adminModal'
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../constants';

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

export default function UserModal(props: any) {
    const { handleClose, open, user, handleRefreshUsers } = props
    const [isEditing, setIsEditing] = useState(false)
    const [isClient, setIsClient] = useState(user.client ? true : false)
    const [openClientModal, setOpenClientModal] = useState(false)
    const [isAdmin, setIsAdmin] = useState(user.administrator ? (user.administrator.active == true) : false)
    const [openAdminModal, setOpenAdminModal] = useState(false)
    const navigate = useNavigate();

    const handleEditUser = () => {
        navigate(`${APP_ROUTES.USERS.EDIT}/${user.id}`)
    }
    const handleClickEdit = () => {
        if (isEditing) {
            setIsEditing(false)
            handleClose()
        } else
            setIsEditing(true)
    }

    const handleCloseModal = () => {
        setIsEditing(false)
        handleClose()
    }
    const handleIsClient = () => { setIsClient(prevState => !prevState) }

    const handleIsAdmin = () => { setIsAdmin(prevState => !prevState) }
    const handleClickOpenModalClient = () => { setOpenClientModal(prevState => !prevState) }
    const handleClickOpenModalAdmin = () => { setOpenAdminModal(prevState => !prevState) }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <>
                {!isEditing &&
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
                                    {/* {
                                        user.client
                                            ? <Typography component={'p'}>Es Cliente <FiberManualRecordIcon sx={{ color: '#3dc260' }} /></Typography>
                                            : <Typography component={'p'}>No es Cliente <FiberManualRecordIcon sx={{ color: '#c3d6c8' }} /></Typography>
                                    } */}

                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '16px' }}>
                                        <ButtonGroup
                                            disableElevation
                                            variant="contained"
                                            aria-label="Disabled button group"
                                        >
                                            {
                                                isClient
                                                    ? <Typography sx={{ background: '#357a38', color: 'white', px: '20px', borderRadius: '4px 0px 0px 4px', alignContent: 'center', fontSize: '12px' }} >ES CLIENTE</Typography>
                                                    : <Typography sx={{ background: '#d3d3d3', color: '000', px: '20px', borderRadius: '4px 0px 0px 4px', alignContent: 'center', fontSize: '12px' }} >NO ES CLIENTE</Typography>
                                            }
                                            <Button variant="outlined" onClick={handleClickOpenModalClient}>Cambiar</Button>
                                        </ButtonGroup>

                                        <ButtonGroup
                                            disableElevation
                                            variant="contained"
                                            aria-label="Disabled button group"
                                        >
                                            {
                                                isAdmin
                                                    ? <Typography sx={{ background: '#ff9800', color: 'black', px: '20px', borderRadius: '4px 0px 0px 4px', alignContent: 'center', fontSize: '12px' }} >ES ADMINISTRADOR</Typography>
                                                    : <Typography sx={{ background: '#d3d3d3', color: '000', px: '20px', borderRadius: '4px 0px 0px 4px', alignContent: 'center', fontSize: '12px' }} >NO ES ADMINISTRADOR</Typography>
                                            }
                                            <Button variant="outlined" onClick={handleClickOpenModalAdmin}>Cambiar</Button>
                                        </ButtonGroup>
                                    </Box>

                                </>
                        }
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
                            <Button variant="contained" onClick={handleCloseModal} startIcon={<ArrowBackIcon />}>Volver</Button>
                            <Button variant="outlined" onClick={handleEditUser} endIcon={<EditIcon />}>Editar </Button>
                        </Box>

                    </Box>
                }
                {
                    isEditing &&
                    <CreateEditModalUser
                        user={user}
                        open={isEditing}
                        handleCloseModal={handleClickEdit}
                        handleRefreshUsers={handleRefreshUsers}
                    />
                }
                {
                    openClientModal &&
                    <ClientModal
                        open={openClientModal}
                        handleClose={handleClickOpenModalClient}
                        user={user}
                        handleIsClient={handleIsClient}
                    />
                }
                {
                    openAdminModal &&
                    <AdminModal
                        open={openAdminModal}
                        handleClose={handleClickOpenModalAdmin}
                        user={user}
                        handleIsClient={handleIsAdmin}
                    />
                }
            </>
        </Modal>
    )
}

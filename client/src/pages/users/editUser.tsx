import { useEffect, useState } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import useGender from '../../hooks/useGender';
import Loader from '../../components/loader/loader'
import { useNavigate, useParams } from 'react-router-dom';
import { APP_ROUTES } from '../../../constants';
import UserForm from '../../components/user/userForm';
import ErrorApi from '../../components/errorApi/errorApi';
import { ApiUsers } from '../../api/apiUsers';
import { useUserByID } from '../../hooks/useUserByID';
import User from '../../interfaces/user';
import ConfirmationModal from '../../components/user/confirmationModal';


const apiUsers = new ApiUsers()

export default function EditUser(props: any) {
    const { id } = useParams();
    const { genders, error: errorGetGender, isLoading: isLoadingGetGenders } = useGender()
    const { user, error: errorGetUser, isLoading: isLoadingGetUser, setIdUSer } = useUserByID()

    console.log(user);
    
    const [newUserData, setNewUserData] = useState<User | null>(null)
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
    const [error, setError] = useState<boolean>(errorGetGender && errorGetUser)
    const [isLoading, setIsLoading] = useState<boolean>(isLoadingGetGenders && isLoadingGetUser)

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`${APP_ROUTES.USERS.LIST}/${id}`)
    }

    const handleCloseModal = () => {
        setOpenConfirmationModal(prevState => !prevState)
    }

    useEffect(() => {
        if (id)
            setIdUSer(parseInt(id))
    }, [id])

    useEffect(() => {
        setIsLoading(isLoadingGetGenders || isLoadingGetUser)
    }, [isLoadingGetGenders, isLoadingGetUser])

    useEffect(() => {
        setError(errorGetGender || errorGetUser)
    }, [errorGetGender, errorGetUser])

    useEffect(() => {
        if (!newUserData)
            return
        handleCloseModal()
    }, [newUserData])


    const handleUpdateData = async () => {
        handleCloseModal()
        try {
            await apiUsers.updateUser('', newUserData)
            navigate(`${APP_ROUTES.USERS.LIST}`)
        } catch (error) {
            setError(true)
        }
    }

    return (
        <Box>
            <Box component={Paper} sx={{ padding: '16px' }}>
                <Typography variant={'h5'} sx={{ textAlign: 'center' }}>Modificar usuario</Typography>
            </Box>
            {
                (genders && user && !error) &&
                <Box sx={{ maxWidth: '850px', borderRadius: '6px', padding: '26px', border: 'none', mx: 'auto' }}>
                    <UserForm
                        user={user}
                        genders={genders}
                        onSend={setNewUserData}
                    />
                </Box>
            }

            {
                (isLoading && !error) &&
                < Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <Loader />
                </Box>
            }

            {
                (error) &&
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <ErrorApi urlDestination={`${APP_ROUTES.USERS.EDIT}/${id}`} />
                </Box>
            }
            <ConfirmationModal
                open={openConfirmationModal}
                handleCloseModal={handleCloseModal}
                handleClikConfirmationModal={handleUpdateData}
            />

        </Box>
    )
}

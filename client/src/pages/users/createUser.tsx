import { useEffect, useState } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import useGender from '../../hooks/useGender';
import Loader from '../../components/loader/loader'
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../constants';
import UserForm from '../../components/user/userForm';
import ErrorApi from '../../components/errorApi/errorApi';
import { ApiUsers } from '../../api/apiUsers';
import User from '../../interfaces/user';


const apiUsers = new ApiUsers()

export default function CreateUser() {
    const { genders, error: errorLoadinGenders, isLoading } = useGender()

    const [newUserData, setNewUserData] = useState<User | null>(null)
    const [error, setError] = useState<boolean>(errorLoadinGenders)

    const navigate = useNavigate();

    useEffect(() => {
        if (!newUserData)
            return
        postNewUser()
    }, [newUserData])

    const postNewUser = async () => {
        try {
            await apiUsers.createUser('', newUserData)
            navigate(`${APP_ROUTES.USERS.LIST}`)
        } catch (error) {
            setError(true)
        }
    }

    return (
        <Box>
            <Box component={Paper} sx={{ padding: '16px' }}>
                <Typography variant={'h5'} sx={{ textAlign: 'center' }}>Nuevo usuario</Typography>
            </Box>
            {
                (genders && !error) &&
                <Box sx={{ maxWidth: '850px', borderRadius: '6px', padding: '26px', border: 'none', mx: 'auto' }}>
                    <UserForm
                        genders={genders}
                        onSend={setNewUserData}
                    />
                </Box>
            }

            {
                (isLoading && !error) &&
                < Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Loader />
                </Box>
            }

            {
                (error) &&
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <ErrorApi urlDestination={APP_ROUTES.USERS.NEW} />
                </Box>
            }
        </Box>
    )
}

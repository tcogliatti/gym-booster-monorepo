import { useUser } from "../../hooks/useUser";
import { Box, Paper, Typography } from '@mui/material';
import User from "../../interfaces/user";
import Loader from "../../components/loader/loader";
import ErrorApi from "../../components/errorApi/errorApi";
import UserList from "./userList";

export default function Users() {
    const { pagination, handleRefreshUsers, isLoading, error } = useUser()
    const users: User[] = pagination?.data

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', gap: '20px' }}>

            <Box component={Paper} sx={{ padding: '16px' }}>
                <Typography variant={'h5'} sx={{ textAlign: 'center' }}>Usuarios</Typography>
                <Typography component={'p'} sx={{ textAlign: 'center' }}>Datos personales</Typography>
            </Box>
            
            { // renderizado de tabla con datos
                (users && !isLoading && !error) &&
                <UserList 
                    users={users}
                    pagination={pagination}
                    handleRefreshUsers={handleRefreshUsers}
                />
              
            }

            { // Loader de espera por datos del backend
                (isLoading && !error) &&
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%', gap: '20px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: '100%' }}>
                        <Loader />
                    </Box>
                </Box>

            }

            { // Mensaje de error 
                (error && !isLoading) &&
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%', gap: '20px' }}>
                    <Box sx={{ display: 'flex', flexGrow: 1, height: '100%' }}>
                        <ErrorApi urlDestination={'users'} />

                    </Box>
                </Box>
            }

        </Box>
    )

}

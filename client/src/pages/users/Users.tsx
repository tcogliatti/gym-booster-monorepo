import { useUser } from "../../hooks/useUser";
import { Box, FormControl, MenuItem, Pagination, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import UserItem from "./userItem";
import User from "../../interfaces/user";
import { LIMIT_ITEMS_PAGINATION_OPTIONS, LIMIT_PAGE_DEFAULT } from "../../../constants";
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Loader from "../../components/loader/loader";

export default function Users() {
    const [searchParams] = useSearchParams();
    const { pagination, getUsersByPage, handleRefreshUsers, isLoading} = useUser()
    const users: User[] = pagination?.data
    const [page, setPage] = useState(searchParams.get('page') || 1)
    const [limit, setLimit] = useState(searchParams.get('limit') || LIMIT_PAGE_DEFAULT)

    useEffect(() => {
        getUsersByPage({ getPage: Number(page), getLimit: Number(limit) })
    }, [page, limit])

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setPage(1)
    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', gap: '20px' }}>
            {
                users && !isLoading
                    // renderizado de tabla con datos
                    ? <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <Box component={Paper} sx={{ padding: '16px' }}>
                                <Typography variant={'h5'} sx={{ textAlign: 'center' }}>Usuarios</Typography>
                                <Typography component={'p'} sx={{ textAlign: 'center' }}>Datos personales</Typography>
                            </Box>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Edad</TableCell>
                                            <TableCell>Dirección</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Tel</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {

                                            users.map(user => {
                                                return (
                                                    <UserItem key={user.id} user={user} handleRefreshUsers={handleRefreshUsers} />
                                                )
                                            })

                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Box>
                        <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'center', alignContent: 'center', gap: '20px' }}>

                            {pagination && (
                                <>
                                    <Pagination
                                        count={Number(pagination.totalPages)}
                                        page={Number(page)}
                                        onChange={handlePageChange}
                                        // onChange={(event) => handlePageChange(event.target.value as number)}
                                        variant="outlined"
                                        color="primary"
                                        sx={{ alignContent: 'center !important' }}
                                    />

                                    <FormControl variant="standard" sx={{ margin: '0px !important' }}>
                                        <Select
                                            labelId="select-limit-label"
                                            id="select-limit"
                                            value={limit}
                                            label="Items por página"
                                            onChange={(event) => handleLimitChange(event.target.value as number)}
                                        >
                                            {LIMIT_ITEMS_PAGINATION_OPTIONS.map((cantItems: number) => (
                                                <MenuItem
                                                    key={cantItems}
                                                    value={cantItems}
                                                >{cantItems}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </>
                            )}
                        </Stack>
                    </>

                    // Loader de espera por datos del backend
                    : <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%', gap: '20px' }}>
                        <Box component={Paper} sx={{ padding: '16px' }}>
                            <Typography variant={'h5'} sx={{ textAlign: 'center' }}>Usuarios</Typography>
                            <Typography component={'p'} sx={{ textAlign: 'center' }}>Datos personales</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: '100%' }}>
                            <Loader />
                        </Box>
                    </Box>
            }
        </Box>
    )

}

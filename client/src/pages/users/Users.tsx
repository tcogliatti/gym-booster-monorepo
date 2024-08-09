import { useUser } from "../../hooks/useUser";
import { Box, FormControl, InputLabel, MenuItem, Pagination, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import UserItem from "./userItem";
import User from "../../interfaces/user";
import { LIMIT_PAGE_DEFAULT, LIMIT_ITEMS_PAGINATION_OPTIONS} from "../../../constants";
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function Users() {
    const [searchParams] = useSearchParams();

    const { pagination, getUsersByPage } = useUser()

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
                            users ?
                                users.map(user => {
                                    return (
                                        <UserItem key={user.id} user={user} />
                                    )
                                })
                                :
                                <TableRow>
                                    <TableCell>No hay usuarios par mostrar</TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
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
                            sx={{alignContent: 'center !important'}}
                        />

                        <FormControl variant="standard" sx={{ margin: '0px !important' }}>
                            <Select
                                labelId="select-limit-label"
                                id="select-limit"
                                value={limit}
                                label="Items por página"
                                onChange={(event) => handleLimitChange(event.target.value as number)}
                            >
                                { LIMIT_ITEMS_PAGINATION_OPTIONS.map((cantItems: number) => (
                                            <MenuItem key={cantItems} value={cantItems}>{cantItems}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </>
                )}
            </Stack>
        </Box>
    )

}

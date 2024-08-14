import { Box, FormControl, MenuItem, Pagination, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserItem from './userItem'
import { LIMIT_ITEMS_PAGINATION_OPTIONS, LIMIT_PAGE_DEFAULT } from '../../../constants'
import { useSearchParams } from 'react-router-dom';

export default function UserList(props: any) {
    const [searchParams, setSearchParams] = useSearchParams();

    const { users, pagination, handleRefreshUsers } = props

    const [page, setPage] = useState(searchParams.get('page') || 1)
    const [limit, setLimit] = useState(searchParams.get('limit') || LIMIT_PAGE_DEFAULT)

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage)
        setSearchParams({ page: String(newPage), limit: String(limit) });
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setSearchParams({ page: String(page), limit: String(newLimit) });
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setPage(1)
    }

    useEffect(() => {
        handleRefreshUsers()
    }, [page, limit])


    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>


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

                                users.map((user: { id: any }) => {
                                    return (
                                        <UserItem
                                            key={user.id}
                                            user={user}
                                            handleRefreshUsers={handleRefreshUsers}
                                        />
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
    )
}

import { useUser } from "../../hooks/useUser";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import UserItem from "./userItem";

export default function Users() {

    const { users, refreshGetUsers } = useUser()
    let number = 0


    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
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
                                    number++
                                    return (
                                        <UserItem user={user} number={number} />
                                    )
                                })
                                :
                                <p>No hay usuarios par mostrar</p>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )

}

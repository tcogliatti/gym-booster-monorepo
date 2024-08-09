import { TableCell, TableRow } from '@mui/material'
import { useState } from 'react'
import { calculateAge } from '../../utils/calculateAge'
import UserModal from './userModal'
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function UserItem(props: any) {
  const { user } = props
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const columns: GridColDef[] = [
  //   { field: 'id', headerName: 'ID', width: 70 },
  //   { field: 'firstName', headerName: 'First name', width: 130 },
  //   { field: 'lastName', headerName: 'Last name', width: 130 },
  //   {
  //     field: 'age',
  //     headerName: 'Age',
  //     type: 'number',
  //     width: 90,
  //   },
  //   {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  //   },
  // ];

  return (
    <>
      <TableRow
        key={user.id}
        onClick={() => handleOpen()}
        sx={{
          '&:hover': { cursor: 'pointer', background: '#e4e4e4' },
          '&:last-child td, &:last-child th': { border: 0 }
        }}>
        <TableCell>{`${user.id}`}</TableCell>
        {/* <TableCell>{`${JSON.stringify(user.id)}`}</TableCell> */}
        <TableCell>{`${user.first_name}, ${user.last_name}`}</TableCell>
        <TableCell>{calculateAge(user.birth_date)}</TableCell>
        <TableCell>{user.address}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phone}</TableCell>
      </TableRow>

      <UserModal user={user} handleClose={handleClose} open={open} />
    </>
  )
}




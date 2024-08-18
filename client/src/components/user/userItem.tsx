import { TableCell, TableRow } from '@mui/material'
import { useState } from 'react'
import { calculateAge } from '../../utils/calculateAge'
import UserModal from './userModal'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import User from '../../interfaces/user';

export default function UserItem(props: any) {
  const { user , handleRefreshUsers} = props

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

      <UserModal user={user} handleClose={handleClose} open={open} handleRefreshUsers={handleRefreshUsers} />
    </>
  )
}




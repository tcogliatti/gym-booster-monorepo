import React from 'react'
import { Box, List, ListItem, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

export default function SideBar() {
  return (
    <Box sx={styles.container}>
      {/* <Toolbar /> */}
      {/* <Divider /> */}
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/clients">
          <ListItemText primary="Clients" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <ListItemText primary="Users" />
        </ListItem>
      </List>
    </Box>
  )
}

const styles = {
  container: {
    gridArea: 'leftSide',
    width: 240,
    background: 'linear-gradient(180deg, rgba(132,150,184,1) 0%, rgba(59,67,82,1) 100%)'
  }
}
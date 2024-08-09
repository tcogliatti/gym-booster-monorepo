import { AppBar, Avatar, Box, Toolbar, Typography } from '@mui/material'
import './HeaderApp.scss'
import { alignProperty } from '@mui/material/styles/cssUtils'

export default function HeaderApp() {
  return (
    <AppBar position='static' sx={styles.appBar}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <div className='logo-brand'></div>
          <Typography variant="h6" noWrap>
            GYM Booster
          </Typography>
        </Box>
        <Typography variant="h6" noWrap>
          Gimnasio del Beto
        </Typography>
        <Box sx={styles.userSide}>
          <div className='avatar-border'>
            <Avatar alt="Remy Sharp" sx={{ border: '1px solid #4E4E4E' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Pepe_Mujica_em_2023_%28cropped%29.jpg/440px-Pepe_Mujica_em_2023_%28cropped%29.jpg" />
          </div>
          <Typography variant="h6" noWrap sx={{alignContent: 'center'}}>
            Pepe Mujica
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

const styles = {
  appBar: {
    gridArea: 'header'
  },
  userSide: {
    flexGrow: 1,
    textAlign: 'right',
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
    alignContent: 'center'
  }
}

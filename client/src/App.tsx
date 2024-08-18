import './App.css'
import FooterApp from './components/footerApp/FooterApp'
import SideBar from './components/sidebar/SideBar'
import { Box, CssBaseline, Typography } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Clients from './pages/clients/Clients'
import HeaderApp from './components/headerApp/HeaderApp'
import Users from './pages/users/Users'
import EditUser from './pages/users/editUser'
import CreateUser from './pages/users/createUser'

function App() {

  return (
    <Router>
      <CssBaseline />
      <Box sx={{
        // width: '1366px',
        display: 'grid',
        height: '100vh',
        gridTemplateRows: 'auto 1fr auto',
        gridTemplateColumns: 'auto 1fr',
        gridTemplateAreas: `
          "header   header"
          "leftSide body"
          "footer   footer"
        `
      }}>
        <HeaderApp />
        <SideBar />
        <Box component="main" sx={{ gridArea: 'body', p: 3, background: '#efefef' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/users" element={<Users />} />
            <Route path='/users/new' element={<CreateUser />} />
            <Route path='/users/edit/:id' element={<EditUser />} />
          </Routes>
        </Box>
        <FooterApp />
      </Box>
    </Router>

  )
}

export default App

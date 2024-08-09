import { Box, Typography } from '@mui/material'
import React from 'react'

export default function FooterApp() {
    const today = new Date() 
  return (
    <Box component="footer" sx={{ gridArea: 'footer', py: 2, textAlign: 'center', backgroundColor: '#3f51b5', color: '#fff' }}>
        <Typography variant='body2'>TC-Software &copy; {today.getFullYear()} GYM Booster</Typography>
    </Box>

  )
}

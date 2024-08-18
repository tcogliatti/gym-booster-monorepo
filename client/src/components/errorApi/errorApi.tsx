import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

export default function ErrorApi(props: any) {
    const { urlDestination } = props
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', width: '50%', mx: 'auto', my: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                <ErrorOutlineIcon sx={{ textAlign: 'center', fontSize: '60px', color: 'FireBrick' }} />
            </Box>
            <Typography sx={{ textAlign: 'center' }}>En este momento no pudimos procesar los datos</Typography>
            <Typography sx={{ textAlign: 'center', fontSize: '14px'}}>Vuelve a intentarlo más tarde</Typography>
            <Button LinkComponent={'a'} href={urlDestination} sx={{ width: '200px', marginTop: '25px' }} endIcon={<RotateLeftIcon />}>Reintentar</Button>
        </Box>
    )
}

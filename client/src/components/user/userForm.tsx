import React from 'react'
import { Avatar, Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { initialValues, validationSchema } from './CreateEditModal/createEditModal.form'
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFormik } from "formik";
import { deepPurple } from '@mui/material/colors';
import { ApiUsers } from '../../api/apiUsers';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { Gender } from '../../interfaces/gender';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../constants';


const apiUsers = new ApiUsers()

export default function UserForm(props: any) {
    const { user, genders, onSend } = props
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleClickShowPasswordConfirmation = () => {
        setShowPasswordConfirmation(!showPasswordConfirmation);
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }
    const handleMouseDownPasswordConfirmation = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }
    
    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate(`${APP_ROUTES.USERS.LIST}`)
    }

    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (user) { // edit mode

                    const { password_confirmation, password, ...cleanData } = formValue
                    const updateUser = { id: user.id, ...cleanData }
                    onSend(updateUser)

                } else { // create mode

                    const { password_confirmation, ...cleanData } = formValue
                    onSend(cleanData)
                }
            } catch (error) {
                console.error(error);
            }
        }
    })
    return (

        <form onSubmit={formik.handleSubmit}>
            <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', marginBottom: '15px', gap: '15px' }}>
                    {
                        user ?
                            <>
                                <Avatar
                                    alt={`${user?.first_name}, ${user?.last_name}`}
                                    sx={{ border: '1px solid #4E4E4E', height: '80px', width: '80px', bgcolor: deepPurple[500] }}
                                    src="">
                                    {`${user?.first_name[0].toUpperCase()}${user?.last_name[0].toUpperCase()}`}
                                </Avatar>
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant="caption">ID: {user?.id}</Typography>
                                    <Typography variant="caption">Alta: {user?.signup_date ? user.signup_date.split('T')[0] : 'Sin datos'}</Typography>
                                </Box>
                            </>
                            :
                            <Avatar
                                alt={`espacio para subir el avatar`}
                                sx={{ border: '1px solid #4E4E4E', height: '80px', width: '80px', bgcolor: deepPurple[500] }}
                                src="">
                            </Avatar>
                    }

                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                    <TextField
                        sx={{ flexGrow: 1 }}
                        id="first_name"
                        label="Nombre"
                        type="text"
                        required
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}

                    />
                    <TextField
                        sx={{ flexGrow: 1 }}
                        id="last_name"
                        label="Apellido"
                        required
                        type="text"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                    />
                </Box>
                <TextField
                    id="email"
                    label="e-mail"
                    required
                    type="email"
                    variant="standard"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}

                />
                {
                    !user &&
                    (
                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <TextField
                                sx={{ flexGrow: 1 }}

                                id="password"
                                label="contraseña"
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                type={showPassword ? 'text' : 'password'}
                                variant="standard"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                                onBlur={formik.handleBlur}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                sx={{ flexGrow: 1 }}
                                id="password_confirmation"
                                label="Confirma constraseña"
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                type={showPasswordConfirmation ? 'text' : 'password'}
                                variant="standard"
                                value={formik.values.password_confirmation}
                                onChange={formik.handleChange}
                                error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                                helperText={formik.touched.password_confirmation && formik.errors.password_confirmation ? formik.errors.password_confirmation : ''}
                                onBlur={formik.handleBlur}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPasswordConfirmation}
                                                onMouseDown={handleMouseDownPasswordConfirmation}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    )

                }
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <TextField
                        sx={{ flexGrow: 1 }}
                        id="address"
                        label="Dirección"
                        required
                        type="text"
                        variant="standard"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                    />
                    <TextField
                        sx={{ flexGrow: 1 }}
                        id="phone"
                        label="Teléfono"
                        required
                        type="text"
                        variant="standard"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <FormControl variant="standard" sx={{ flexGrow: 1 }}>
                        <InputLabel id="label-gender" required>Género</InputLabel>
                        <Select
                            variant="standard"
                            labelId="label-gender"
                            id="gender_id"
                            name="gender_id"
                            label="Genero"
                            required
                            value={formik.values.gender_id ? formik.values.gender_id : 0}
                            onChange={formik.handleChange}
                            error={formik.touched.gender_id && Boolean(formik.errors.gender_id)}
                        >
                            <MenuItem selected disabled key={0} value={0}>Seleccione</MenuItem>
                            {genders.map((genero: Gender) => (
                                <MenuItem key={genero.id} value={genero.id}>{genero.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        sx={{ flexGrow: 1 }}
                        id="birth_date"
                        label="Fecha de nacimiento"
                        required
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        placeholder='none'
                        value={formik.values.birth_date.split('T')[0]}
                        onChange={formik.handleChange}
                        error={formik.touched.birth_date && Boolean(formik.errors.birth_date)}
                    />
                </Box>



                <TextField
                    sx={{ width: '60%', mx: 'auto' }}
                    id="dni"
                    label="DNI"
                    required
                    type="number"
                    variant="standard"
                    value={formik.values.dni}
                    onChange={formik.handleChange}
                    error={formik.touched.dni && Boolean(formik.errors.dni)}
                />
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
                <Button variant="contained"  startIcon={<ArrowBackIcon />} onClick={handleBackButton} sx={{width: '200px'}} >Volver</Button>
                <Button variant="outlined" type='submit' endIcon={<SendIcon />} sx={{width: '200px'}}>
                    {
                        user
                            ? 'Modificar'
                            : 'Crear'
                    }

                </Button>
            </Box>
        </form>

    )
}

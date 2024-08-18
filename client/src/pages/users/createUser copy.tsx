import React, { useState } from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useUser } from '../../hooks/useUser';
import { Avatar, Box, Paper, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import useGender from '../../hooks/useGender';
import { initialValues, validationSchema } from '../../components/user/CreateEditModal/createEditModal.form'
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFormik } from "formik";
import { deepPurple } from '@mui/material/colors';
import { ApiUsers } from '../../api/apiUsers';
import Loader from '../../components/loader/loader'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ConfirmationModal from '../../components/user/confirmationModal'
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../constants';


const apiUsers = new ApiUsers()

export default function CreateUserBK(props:any) {
    // const { pagination, handleRefreshUsers, isLoading, error } = useUser()
    // const users: User[] = pagination?.data
    const [crateNewUser, setCreateNewUser] = useState(false)
    const { genders, error, isLoading } = useGender()


    const { user, handleCloseModal, open, handleRefreshUsers } = props
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
    const [dataToUpdate, setDataToUpdate] = useState<any>(null)

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

    const handleClikConfirmationModal = () => {
        handleRefreshUsers()
        setOpenConfirmationModal(false)
    }
    const handleUpdateData = async () => {
        await apiUsers.updateUser('', dataToUpdate)
    }
    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (user) {
                    const { password_confirmation, password, ...cleanData } = formValue
                    const updateUser = { id: user.id, ...cleanData }
                    setDataToUpdate(updateUser)
                    setOpenConfirmationModal(true)

                } else {

                    const { password_confirmation, ...cleanData } = formValue
                    await apiUsers.createUser('', cleanData)
                    handleRefreshUsers()
                    handleCloseModal()
                }
            } catch (error) {
                console.error(error);
            }
        }
    })

    const handleClose = () => {
        setCreateNewUser(prevState => !prevState)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', gap: '20px' }}>

            <Box component={Paper} sx={{ padding: '16px' }}>
                <Typography variant={'h5'} sx={{ textAlign: 'center' }}>Nuevo Usuario</Typography>
                <Typography component={'p'} sx={{ textAlign: 'center' }}>Formulario para alta de nuevo usuario de sistema</Typography>
                <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignContent: 'center' }}>

                </Box>
            </Box>

            <Box component={Paper} sx={{ borderRadius: '6px', padding: '26px', border: 'none' }}>

                {
                    (genders && !error) && (
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
                                            {genders.map((genero) => (
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
                                <Button variant="contained" onClick={handleCloseModal} startIcon={<ArrowBackIcon />} sx={{width: '200px'}}>Volver</Button>
                                <Button variant="outlined" type='submit' endIcon={<SendIcon />} sx={{width: '200px'}}>
                                    {
                                        user
                                            ? 'Modificar'
                                            : 'Crear'
                                    }

                                </Button>
                            </Box>
                        </form>

                    )}
                {
                    (isLoading && !error) &&
                    < Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        height: '50vh' }}
                    >
                        <Loader />
                    </Box>
                }
                {/* {
                    (error) &&
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                            <ErrorOutlineIcon sx={{ textAlign: 'center', fontSize: '60px' }} />
                        </Box>
                        <Typography sx={{ textAlign: 'center' }}>En este momento no pudimos procesar los datos</Typography>
                        <Typography sx={{ textAlign: 'center' }}>Vuelve a intentarlo más tarde</Typography>
                        <Button variant="contained" onClick={handleCloseModal} startIcon={<ArrowBackIcon />}>Volver</Button>
                    </Box>
                } */}

            </Box>
        </Box>
    )
}

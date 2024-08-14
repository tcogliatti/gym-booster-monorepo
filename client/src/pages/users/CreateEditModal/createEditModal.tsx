import { Avatar, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import useGender from '../../../hooks/useGender';
import { initialValues, validationSchema } from './createEditModal.form'
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFormik } from "formik";
import { deepPurple } from '@mui/material/colors';
import { ApiUsers } from '../../../api/apiUsers';
import Loader from '../../../components/loader/loader'

const apiUsers = new ApiUsers()

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function CreateEditModalUser(props: any) {
    const { user, handleCloseModal, handleRefreshUsers } = props
    const { genders } = useGender()

    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            const updateUser = { id: user.id, ...formValue }
            console.log(updateUser);
            console.log(formValue);
            try {
                await apiUsers.updateUser('', updateUser)
                handleRefreshUsers()
                handleCloseModal()
            } catch (error) {
                console.error(error);
            }
        }
    })

    return (
        <Box sx={{ ...style, width: 400, borderRadius: '6px', padding: '26px', border: 'none' }}>

            {
                genders ?
                <form onSubmit={formik.handleSubmit}>
                    <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', marginBottom: '15px', gap: '15px' }}>
                            <Avatar
                                alt={`${user.first_name}, ${user.last_name}`}
                                sx={{ border: '1px solid #4E4E4E', height: '80px', width: '80px', bgcolor: deepPurple[500] }}
                                src="">
                                {`${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}`}
                            </Avatar>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption">ID: {user.id}</Typography>
                                <Typography variant="caption">Alta: {user.signup_date ? user.signup_date.split('T')[0] : 'Sin datos'}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                            <TextField
                                id="first_name"
                                label="Nombre"
                                type="text"
                                required
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                error={formik.touched.first_name && Boolean(formik.errors.first_name)}

                            />
                            <TextField
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
                        <TextField
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
                            id="phone"
                            label="Teléfono"
                            required
                            type="text"
                            variant="standard"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                        />
                        <FormControl variant="standard">
                            <InputLabel id="label-gender" required>Género</InputLabel>
                            <Select
                                variant="standard"
                                labelId="label-gender"
                                id="gender_id"
                                name="gender_id"
                                label="Genero"
                                required
                                value={formik.values.gender_id}
                                onChange={formik.handleChange}
                                error={formik.touched.gender_id && Boolean(formik.errors.gender_id)}
                            >
                                {genders.map((genero) => (
                                    <MenuItem key={genero.id} value={genero.id}>{genero.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
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
                        <TextField
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
                        <Button variant="contained" onClick={handleCloseModal} startIcon={<ArrowBackIcon />}>Volver</Button>
                        <Button variant="outlined" type='submit' endIcon={<SendIcon />}>
                        {
                            user
                            ? 'Modificar'
                            : 'Crear'
                        }
                         
                        </Button>
                    </Box>
                </form>

                : <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}> <Loader /> </Box> 
            }

        </Box>
    )
}

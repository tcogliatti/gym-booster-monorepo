import * as yup from 'yup'

export function initialValues(user: any) {
    return {
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.address || '',
            birth_date: user?.birth_date || '',
            gender_id: user?.gender.id || 0,
            dni: user?.dni || undefined,
            password: user?'Contraseña.3' : '',
            password_confirmation: user?'Contraseña.3' : '',
            avatar: null,
    }
}

export function validationSchema() {
    return yup.object({
        first_name: yup.string().required('Este campo no puede estar vacío'),
        last_name:  yup.string().required('Este campo no puede estar vacío'),
        email:      yup.string().email('Ingrese un correo electrónioco válido').required('Este campo no puede estar vacío'),
        phone:      yup.string().required('Este campo no puede estar vacío'),
        address:    yup.string().required('Este campo no puede estar vacío'),
        birth_date: yup.date().required('Este campo no puede estar vacío'),
        gender_id:  yup.number().required('Este campo no puede estar vacío'),
        dni:        yup.number().required('Este campo no puede estar vacío'),
        password:   yup.string()
            .required('Este campo es obligatorio')
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
            .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
            .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'La contraseña debe contener al menos un carácter especial'),
        password_confirmation:   yup.string()
            .required('Este campo es obligatorio')
            .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir'),
    })
}
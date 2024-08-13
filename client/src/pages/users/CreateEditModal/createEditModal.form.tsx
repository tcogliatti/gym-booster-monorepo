import * as yup from 'yup'
import User from '../../../interfaces/user'

export function initialValues(user: any) {
    return {
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            email: user.email || '',
            phone: user.phone || '',
            address: user.address || '',
            birth_date: user.birth_date || '',
            gender_id: user.gender.id || NaN,
            dni: user.dni || NaN,
    }
}

export function validationSchema() {
    return yup.object({
        first_name: yup.string().required('Este campo no puede estar vacío'),
        last_name: yup.string().required('Este campo no puede estar vacío'),
        email: yup.string().email('No es un email').required('Este campo no puede estar vacío'),
        phone: yup.string().required('Este campo no puede estar vacío'),
        address: yup.string().required('Este campo no puede estar vacío'),
        birth_date: yup.date().required('Este campo no puede estar vacío'),
        gender_id: yup.number().required('Este campo no puede estar vacío'),
        dni: yup.number().required('Este campo no puede estar vacío')
    })
}
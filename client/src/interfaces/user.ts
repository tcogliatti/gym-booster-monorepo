import { AdministratorType } from '../interfaces/administrator_type';
import { Gender } from './gender';
export default interface User {
  id?: number
  first_name: string
  last_name: string
  birth_date: string
  address: string
  phone: string
  email: string
  password?: string
  dni: number
  signup_date?: string
  client?: boolean
  gender: Gender
  administrator?: AdministratorType
}
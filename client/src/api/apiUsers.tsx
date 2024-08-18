import User from '../interfaces/user'
import { API_BASE, API_ROUTES } from "../../constants";
import { ListResponse } from '../interfaces/listResponse'

export class ApiUsers {

    constructor() { }

    async getAllUsers(params: any): Promise<ListResponse | null> {
        const { limit, page, accessToken } = params
        try {
            const url = `${API_BASE}/${API_ROUTES.USERS}?limit=${limit}&page=${page}`
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const usersResponse: ListResponse = await response.json();

            return usersResponse
        } catch (error) {
            throw ({ msg: 'error when try to get users', error });
        }
    }

    async getUsersById(params: any): Promise<User | null> {
        const { accessToken, idUser } = params
        try {
            const url = `${API_BASE}/${API_ROUTES.USERS}/${idUser}`
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch user by ID');
            }
            const usersResponse: User = await response.json();

            return usersResponse
        } catch (error) {
            throw ({ msg: 'error when try to get user by ID', error });
        }
    }

    async updateUser(access_token: string, user: any): Promise<User> {
        try {

            // const formData = new FormData();
            // Object.keys(user).forEach((key) => {
            //     formData.append(key, user[key]);
            // });
            const url = `${API_BASE}/${API_ROUTES.USERS}/${user.id}`
            const params = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access_token}`, // Si necesitas enviar un token de autorización
                },
                body: JSON.stringify(user),
            }
            const response = await fetch(url, params);
            if (!response.ok) {
                throw new Error('Failed to pathch users');
            }
            const userResponse: User = await response.json();

            return userResponse
        } catch (error) {
            throw new Error('Failed to pathch user');
        }
    }
    async createUser(access_token: string, user: any): Promise<User> {
        try {

            // const formData = new FormData();
            // Object.keys(user).forEach((key) => {
            //     formData.append(key, user[key]);
            // });
            const url = `${API_BASE}/${API_ROUTES.USERS}`
            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${access_token}`, // Si necesitas enviar un token de autorización
                },
                body: JSON.stringify(user),
            }
            const response = await fetch(url, params);
            if (!response.ok) {
                throw new Error('Failed to create user');
            }
            const userResponse: User = await response.json();

            return userResponse
        } catch (error) {
            throw new Error('Failed to create user');
        }
    }
}
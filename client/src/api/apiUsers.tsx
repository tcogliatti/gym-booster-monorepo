import User from '../interfaces/user'
import { API_BASE, API_ROUTES } from "../../constants";
import { ListResponse } from '../interfaces/listResponse'

export class ApiUsers {

    constructor() { }

    async getAllUsers(params: any): Promise<ListResponse | null> {
        const {limit, page, accessToken} = params
        try {
            const url = `${API_BASE}/${API_ROUTES.USERS}?limit=${limit}&page=${page}`
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const usersResponse: ListResponse = await response.json();

            return usersResponse
        } catch (error) {
            console.error(error);
            return null
        }
    }
}
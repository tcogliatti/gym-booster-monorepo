import User from '../interfaces/user'
import { API_BASE, API_ROUTES } from "../../constants";

export async function getAllUsers(): Promise<User[] | null> {
    try {
        const url = `${API_BASE}/${API_ROUTES.USERS}`
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const usersResponse: User[] = await response.json();

        return usersResponse
    } catch (error) {
        console.error(error);
        return null
    }
}
import { API_BASE, API_ROUTES } from "../../constants"
import { Gender } from "../interfaces/gender";

export class ApiGender {
    constructor() {

    }

    async getAllGender(params: any): Promise<Gender[] | null> {
        const { accessToken } = params
        try {
            const url = `${API_BASE}/${API_ROUTES.GENDER}`
            const response = await fetch(url)

            if(!response.ok)
                throw new Error('Failed to fetch genders');
            
            const genderResponse: Gender[] = await response.json();

            return genderResponse
        } catch (error) {
            console.error(error);
            return null
        }
}
}
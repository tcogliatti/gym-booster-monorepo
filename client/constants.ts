export const SERVER_IP = 'localhost:5173'
export const BASE_PATH = `http://${SERVER_IP}/`
export const API_BASE = 'http://localhost:3977/api/v1'
export const API_ROUTES = {
    USERS: 'user',
    GENDER: 'gender',
}
export const LIMIT_PAGE_DEFAULT = 5
export const LIMIT_ITEMS_PAGINATION_OPTIONS: number[] = [5, 10, 20, 50]
export const APP_ROUTES = {
    USERS: {
        LIST: '/users',
        NEW: 'new',
        EDIT:'/users/edit'
    }
}
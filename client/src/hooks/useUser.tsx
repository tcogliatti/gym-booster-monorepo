import { useState, useEffect } from 'react'
import User from '../interfaces/user'
import { getAllUsers } from "../api/apiUsers";

export function useUser() {
    const [users, setUsers] = useState<User[] | null>(null)

    const refreshGetUsers = () => {
        getAllUsers().then(setUsers)
    }
    useEffect(refreshGetUsers, [])

    return ({ users: users, refreshGetUsers })
}

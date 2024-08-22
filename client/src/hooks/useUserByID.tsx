import { useState, useEffect } from 'react'
import User from '../interfaces/user'
import { ApiUsers } from "../api/apiUsers";

const apiUsers = new ApiUsers()

export function useUserByID() {
    const [idUser, setIdUSer ] = useState<number | null>(null)
    const [refreshUserList, setRefreshUserList] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorFetch, setError] = useState<boolean>(false)
    const [user, setUser ] = useState<User | null>(null)
    
    const handleRefresh = () => {        
        setRefreshUserList(prevState => !prevState)
    }


    useEffect(() => {
        if(!idUser)
            return

        setIsLoading(true)
        apiUsers.getUsersById({ access_token: '', idUser: idUser })
            .then(response => {

                if (!response)
                    setUser(null)

                setUser(response)
                setIsLoading(false)
                setError(false)
            })
            .catch(error => {
                setError(true)
                console.error(error);
            })

    }, [refreshUserList, idUser])

    return ({ handleRefresh, isLoading, error: errorFetch, user: user, setIdUSer })
}


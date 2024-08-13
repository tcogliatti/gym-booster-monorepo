import { useState, useEffect } from 'react'
import User from '../interfaces/user'
import { ApiUsers } from "../api/apiUsers";
import { useSearchParams } from 'react-router-dom';
import { ListResponse } from '../interfaces/listResponse';
import { LIMIT_PAGE_DEFAULT } from "../../constants";
const apiUsers = new ApiUsers()

interface GetUserByPageParams {
    getPage?: number;
    getLimit?: number;
}

export function useUser() {

    // const [users, setUsers] = useState<User[] | null>(null)
    const [pagination, setPagination] = useState<ListResponse | null>(null)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(LIMIT_PAGE_DEFAULT)
    const [refreshUserList, setRefreshUserList] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleRefreshUsers = () => {
        setRefreshUserList(prevState => !prevState)
    }

    useEffect(() => {
        setIsLoading(true)
        apiUsers.getAllUsers({ page, limit }).then(response => {

            if (!response)
                setPagination(null)

            setPagination(response)
            setIsLoading(false)

        })

    }, [page, limit, refreshUserList])

    const getUsersByPage = ({ getPage, getLimit}: GetUserByPageParams) => {
        if (getPage)
            setPage(getPage)
        if(getLimit)
            setLimit(getLimit)
    }

    
 
    return ({ pagination: pagination, getUsersByPage, handleRefreshUsers, isLoading: isLoading })
}

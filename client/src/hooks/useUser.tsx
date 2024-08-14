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
    const [searchParams, setSearchParams] = useSearchParams();

    const [pagination, setPagination] = useState<ListResponse | null>(null)
    const [page, setPage] = useState(searchParams.get('page') || 1)
    const [limit, setLimit] = useState(searchParams.get('limit') || LIMIT_PAGE_DEFAULT)
    const [refreshUserList, setRefreshUserList] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleRefreshUsers = () => {        
        setPage(searchParams.get('page') || 1)     
        setLimit(searchParams.get('limit') || LIMIT_PAGE_DEFAULT)   
        setRefreshUserList(prevState => !prevState)
    }


    useEffect(() => {

        setIsLoading(true)
        apiUsers.getAllUsers({ page, limit })
            .then(response => {

                if (!response)
                    setPagination(null)

                setPagination(response)
                setIsLoading(false)
                setError(false)
            })
            .catch(error => {
                setError(true)
                console.error(error);
            })


    }, [refreshUserList])

    return ({ pagination: pagination, handleRefreshUsers, isLoading: isLoading, error: error })
}

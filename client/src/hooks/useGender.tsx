import React, { useEffect, useState } from 'react'
import { ApiGender } from '../api/apiGender'
import { Gender } from '../interfaces/gender'

const apiGender = new ApiGender()

export default function useGender() {
    const [genderList, setGenderList] = useState<Gender[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setError(false)
        apiGender.getAllGender({ access_token: 'ss' })
            .then((response) => {
                if (response) {
                    setGenderList(response)
                    setIsLoading(false)
                } else {
                    setGenderList(null)
                    setError(true)
                    console.error({msg: 'Error to fetch data', error: error});
                }
                
            })
            .catch((error) => {
                setGenderList(null)
                setError(true)
                console.error({msg: 'Error to fetch data', error: error});
            })
    }, [])

    return ({ genders: genderList, error: error, isLoading: isLoading })
}

import React, { useEffect, useState } from 'react'
import { ApiGender } from '../api/apiGender'
import { Gender } from '../interfaces/gender'

const apiGender = new ApiGender()

export default function useGender() {
    const [genderList, setGenderList] = useState<Gender[] | null>(null)
    
    useEffect(() => {
        try {
            apiGender.getAllGender({access_token: 'ss'})
            .then(response => setGenderList(response))

        } catch (error) {
            setGenderList(null)
        }
    }, [])
    
  return ({genders: genderList})
}

'use client'

import useRegisterModal from "@/app/hooks/useRegisterModal"
import axios from "axios"
import { useCallback, useState } from "react"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from 'react-icons/fc'

export const RegisterModal = () => {

    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/register', data)
            .then(() => {

                registerModal.onClose()
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false)
            })
    }


    return (
        <div></div>
    )
}

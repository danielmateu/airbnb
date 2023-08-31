'use client'

import useRegisterModal from "@/app/hooks/useRegisterModal"
import axios from "axios"
import { useCallback, useState } from "react"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from 'react-icons/fc'
import { Modal } from "./Modal"
import { Heading } from "../Heading"
import { Input } from "../inputs/Input"
import { toast } from "react-hot-toast"
import { Button } from "../Button"
import { signIn } from "next-auth/react"
import useLoginModal from "@/app/hooks/useLoginModal"


export const RegisterModal = () => {

    const loginModal = useLoginModal()
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
                toast.success('Registro correcto')
                registerModal.onClose()
            }).catch((error) => {
                toast.error('algo ha salido mal...')
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const toggle = useCallback(() => {
        registerModal.onClose()
        loginModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Bienvenido a Airbnb"
                subtitle="Registrate para poder acceder a todas las funcionalidades de la aplicación"
            />
            <Input
                id="name"
                label="Nombre"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            // placeholder="Introduce tu nombre"
            />
            <Input
                id="email"
                type="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            // placeholder="Introduce tu email"
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            // placeholder="Introduce tu password"
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4">
            <hr />
            <Button
                outline
                label="Sigue con Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Sigue con Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className="text-neutral-500 text-center mt-4 font-light flex justify-center gap-2">
                <p>¿Ya tienes una cuenta?</p>
                <p
                    onClick={toggle}
                    className="font-semibold cursor-pointer">Login</p>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Regístrate"
            actionLabel="Continuar"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

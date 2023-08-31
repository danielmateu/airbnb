'use client'

// import useRegisterModal from "@/app/hooks/useRegisterModal"
// import axios from "axios"
import { useCallback, useState } from "react"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from 'react-icons/fc'
import { Modal } from "./Modal"
import { Heading } from "../Heading"
import { Input } from "../inputs/Input"
import { toast } from "react-hot-toast"
import { Button } from "../Button"
import useLoginModal from "@/app/hooks/useLoginModal"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react'


export const LoginModal = () => {

    const router = useRouter()
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
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

        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((resp) => {
            setIsLoading(false)

            if (resp?.ok) {
                toast.success('Login correcto')
                router.refresh()
                loginModal.onClose()
            }

            if (!resp?.ok) toast.error('Error al iniciar sesión')
        })

    }

    const toggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Bienvenido de nuevo"
                subtitle="Haz login para continuar"
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
                <p>¿Primera vez usando Airbnb?</p>
                <p
                    onClick={toggle}
                    className="font-semibold cursor-pointer">Crea una cuenta</p>
            </div>
        </div>

    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continuar"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

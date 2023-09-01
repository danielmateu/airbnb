'use client'

import { AiOutlineMenu } from "react-icons/ai"
import { Avatar } from "../Avatar"
import { ModeToggle } from "../ModeTogle"
import { useCallback, useState } from "react"
import { MenuItem } from "./MenuItem"
import useRegisterModal from "@/app/hooks/useRegisterModal"

import useLoginModal from "@/app/hooks/useLoginModal"
// import { User } from "@prisma/client"
import { signOut } from 'next-auth/react'
import { SafeUser } from "@/app/types"
import useRentModal from "@/app/hooks/useRentModal"
import { useRouter } from "next/navigation"

interface UserMenuProps {
    currentUser?: SafeUser | null
}

export const UserMenu = ({
    currentUser
}: UserMenuProps) => {

    const router = useRouter()
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isOpen, setIsOpen] = useState(false)
    const rentModal = useRentModal()

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }

        rentModal.onOpen()
    }, [currentUser, loginModal, rentModal])

    return (
        <div className='relative'>
            <div className="flex items-center gap-1">
                <div
                    onClick={onRent}
                    className="hidden lg:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition cursor-pointer">
                    Airbnb tu casa
                </div>

                <ModeToggle />

                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-4 border-[1px] border-neutral-200 dark:border-0 flex flex-grow items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {
                isOpen && (
                    <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                        <div className="flex flex-col cursor-pointer">
                            {currentUser ? (
                                <>
                                    <MenuItem
                                        onClick={() => router.push(`/trips`)}
                                        label="Mis viajes"
                                    />
                                    <MenuItem
                                        onClick={() => { }}
                                        label="Favoritos"
                                    />
                                    <MenuItem
                                        onClick={() => { }}
                                        label="Mis reservas"
                                    />
                                    <MenuItem
                                        onClick={() => { }}
                                        label="Mis propiedades"
                                    />
                                    <MenuItem
                                        onClick={rentModal.onOpen}
                                        label="Airbnb mi casa"
                                    />
                                    <hr />
                                    <MenuItem
                                        onClick={signOut}
                                        label="Logout"
                                    />
                                </>
                            ) :
                                <>
                                    <MenuItem
                                        onClick={loginModal.onOpen}
                                        label="Login"
                                    />
                                    <MenuItem
                                        onClick={registerModal.onOpen}
                                        label="Sign up"
                                    />
                                </>
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

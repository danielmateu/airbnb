'use client'

import { AiOutlineMenu } from "react-icons/ai"
import { Avatar } from "../Avatar"
import { ModeToggle } from "../ModeTogle"
import { useCallback, useState } from "react"
import { MenuItem } from "./MenuItem"

export const UserMenu = () => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])



    return (
        <div className='relative'>
            <div className="flex items-center gap-1">
                <div className="hidden lg:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition cursor-pointer">
                    Airbnb tu casa
                </div>

                <ModeToggle />

                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-4 border-[1px] border-neutral-200 dark:border-0 flex flex-grow items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>
            {
                isOpen && (
                    <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                        <div className="flex flex-col cursor-pointer">
                            <>
                                <MenuItem
                                    onClick={() => { }}
                                    label="Login"
                                />
                                <MenuItem
                                    onClick={() => { }}
                                    label="Sign up"
                                />
                            </>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

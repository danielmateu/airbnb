'use client'

import { SafeUser } from "@/app/types"
import Container from "../Container"

import Logo from "./Logo"
import { Search } from "./Search"
import { UserMenu } from "./UserMenu"
import { Categories } from "./Categories"

// import { User } from "@prisma/client"


interface NavbarProps {
    currentUser?: SafeUser | null
}


export const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    // console.log(currentUser);
    return (
        <div className="sticky top-0 w-full bg-white opacity-95 dark:bg-slate-800 z-10 shadow-sm">
            <div className=" py-4 border-b-[1px] dark:border-slate-700">

                <div className="flex items-center justify-between 
                    ">
                    <Logo />
                    <Search />
                    <UserMenu currentUser={currentUser} />
                </div>

            </div>
            <Categories />
        </div>
    )
}

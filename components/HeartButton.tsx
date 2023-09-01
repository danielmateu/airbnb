'use client'

import { SafeUser } from "@/app/types"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface HeartButtonProps {
    listingId: string
    currentUser?: SafeUser | null
}

export const HeartButton = ({
    listingId,
    currentUser,
}: HeartButtonProps) => {

    const hasFavorited = false
    const toggleFavorite = () => { }

    return (
        <div
            onClick={toggleFavorite}
            className="relative hover:opacity-80 transition-opacity cursor-pointer"
        >
            <AiOutlineHeart
                size={24}
                className={`
                absolute -top-[.5px] -right-[.1px] text-white`}
            />
            <AiFillHeart
                size={24}
                className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
            />
        </div>
    )
}

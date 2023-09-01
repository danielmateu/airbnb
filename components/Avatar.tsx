'use client'

import Image from "next/image"

interface AvatarProps {
    src: string | null | undefined
}

export const Avatar = ({
    src
}: AvatarProps) => {
    return (
        <Image
            src={src || "/images/placeholder.jpg"}
            alt="avatar"
            width={30}
            height={30}
            className="rounded-full hover:rotate-12 hover:scale-105 transition"
        />


    )
}

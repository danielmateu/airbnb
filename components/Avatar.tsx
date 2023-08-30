'use client'

import Image from "next/image"

export const Avatar = () => {
    return (
        <Image
            src="/images/placeholder.jpg"
            alt="avatar"
            width={30}
            height={30}
            className="rounded-full"
        />


    )
}

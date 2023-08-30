'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {

    const router = useRouter()

    return (
        <Image
            src="/images/logo.png"
            alt="brand logo"
            width={90}
            height={90}
            priority
            onClick={() => router.push("/")}
            className="cursor-pointer hover:scale-105 transition"
        />
    )
}

export default Logo

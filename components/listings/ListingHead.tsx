'use client'

import useCountries from "@/app/hooks/useCountries"
import { SafeUser } from "@/app/types"
import { Heading } from "@/components/Heading"
import { HeartButton } from "@/components/HeartButton"
import Image from "next/image"

interface ListingHeadProps {
    title: string
    imageSrc: string
    locationValue: string
    id: string
    currentUser?: SafeUser | null
}

export const ListingHead = ({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser
}: ListingHeadProps) => {

    const { getByValue } = useCountries()
    const location = getByValue(locationValue)

    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />

            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    alt="Listing image"
                    src={imageSrc}
                    fill
                    className="object-cover rounded-xl w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    )
}

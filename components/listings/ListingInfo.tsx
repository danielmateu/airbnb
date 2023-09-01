'use client'

import useCountries from "@/app/hooks/useCountries"
import { SafeUser } from "@/app/types"
import { IconType } from "react-icons"
import { Avatar } from "../Avatar"
import { ListingCategory } from "./ListingCategory"
import dynamic from "next/dynamic"
import { Map } from "../Map"

// const Map = dynamic(() => import('../Map'), {
//     srr: false
// } )

interface ListingInfoProps {
    user: SafeUser
    description: string
    guestCount: number
    roomCount: number
    bathroomCount: number
    category: {
        icon: IconType
        label: string
        description: string
    } | undefined
    locationValue: string

}

export const ListingInfo = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue
}: ListingInfoProps) => {

    const { getByValue } = useCountries()
    const coordinates = getByValue(locationValue)?.latlng

    return (
        <div className="col-span-4 flex flex-col gap-7 shadow-md p-4 rounded-xl">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex items-center gap-2 ">
                    <div>Hospedado por {user?.name}</div>
                    <Avatar
                        src={user?.image}
                    />
                </div>
                <div className="flex items-center gap-4 font-light text-neutral-500 dark:text-neutral-300">
                    <div>{guestCount} huéspedes</div>
                    <div>{roomCount} habitaciones </div>
                    <div>{bathroomCount} baños</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500 dark:text-neutral-300">
                {description}
            </div>
            <hr />
            <Map center={coordinates} />
        </div>
    )
}

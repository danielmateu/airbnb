'use client'

import { SafeListing, SafeUser } from "@/app/types"
import Container from "@/components/Container";
import { categories } from "@/components/navbar/Categories";
import { Listing, Reservation } from "@prisma/client"
import { useMemo } from 'react';
import { ListingHead } from "../../app/listings/[listingId]/ListingHead";
import { ListingInfo } from "./ListingInfo";

interface ListingClientProps {
    listing: SafeListing & {
        user: SafeUser
    }
    reservations?: Reservation[]
    currentUser?: SafeUser | null
}

export const ListingClient = ({
    listing,
    reservations,
    currentUser
}: ListingClientProps) => {

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category)
    }, [listing.category])

    // if (!category) {}

    return (
        <Container>
            <div className="px-4 sm:px-0 max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                    </div>
                </div>
            </div>
        </Container>
    )
}

'use client'

import Container from "@/components/Container"
import { SafeListing, SafeUser } from "../types"
import { Heading } from "@/components/Heading"
import { ListingCard } from "@/components/listings/ListingCard"

interface FavoriteClientProps {
    currentUser?: SafeUser | null
    listings: SafeListing[]
}

export const FavoriteClient = ({
    currentUser,
    listings
}: FavoriteClientProps) => {
    return (
        <Container>
            <Heading
                title="Tus favoritos"
                subtitle="Esto es una lista de tus lugares favoritos"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-10 gap-8">
                {
                    listings.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            currentUser={currentUser}
                            data={listing}
                        />
                    ))
                }
            </div>
        </Container>
    )
}

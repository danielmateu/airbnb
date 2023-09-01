// "use client"

import Container from "@/components/Container"
import { EmptyState } from "@/components/EmptyState"
import getListings from "./actions/getListings"
import { ListingCard } from "@/components/listings/ListingCard"
import getCurrentUser from "./actions/getCurrentUser"

export default async function Home() {

  const listings = await getListings()
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    )
  }

  return (
    <Container>
      <div
        className="pt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 h-full pb-20"
      >
        {
          listings.map((listing: any) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))
        }
      </div>
    </Container>
  )
}

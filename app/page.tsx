// "use client"

import Container from "@/components/Container"
import { EmptyState } from "@/components/EmptyState"
import getListings, { IListingsParams } from "./actions/getListings"
import { ListingCard } from "@/components/listings/ListingCard"
import getCurrentUser from "./actions/getCurrentUser"

interface HomeProps {
  searchParams: IListingsParams
}

const Home = async ({
  searchParams
}: HomeProps) => {

  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    )
  }

  // throw new Error("Error")

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

export default Home

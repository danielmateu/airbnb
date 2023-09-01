import getCurrentUser from '@/app/actions/getCurrentUser'
import getListingById from '@/app/actions/getListingById'
// import { ClientOnly } from '@/components/ClientOnly'
import { EmptyState } from '@/components/EmptyState'
import React from 'react'
import { ListingClient } from './ListingClient'
import getReservations from '@/app/actions/getReservations'

interface Iparams {
    listingId: string
}

const ListingPage = async ({
    params
}: { params: Iparams }) => {

    const listing = await getListingById(params)
    const reservations = await getReservations(params)
    const currentUser = await getCurrentUser()

    if (!listing) {
        return (
            <EmptyState
                title="No hay nada por aquí"
                subtitle='Parece que la publicación que buscas no existe o ha sido eliminada.'
            />)

    }
    return (
        <div>
            <ListingClient
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
            />
        </div>
    )
}

export default ListingPage
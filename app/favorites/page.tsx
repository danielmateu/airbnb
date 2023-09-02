

import { EmptyState } from "@/components/EmptyState"
import getCurrentUser from "../actions/getCurrentUser"
import getFavoriteListings from "../actions/getFavoriteListings"

import { FavoriteClient } from "./FavoriteClient";



const FavoritesPage = async () => {

    const listings = await getFavoriteListings()
    const currentUser = await getCurrentUser()

    if (listings.length === 0) {

        return (
            <EmptyState
                title="Aún no tienes favoritos"
                subtitle="Agrega tus favoritos para tenerlos siempre a la mano"
            />
        )
    }

    return (
        <FavoriteClient
            listings={listings}
            currentUser={currentUser}
        />
    )

}

export default FavoritesPage
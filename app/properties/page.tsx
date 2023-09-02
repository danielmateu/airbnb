import { EmptyState } from "@/components/EmptyState"
import getCurrentUser from "../actions/getCurrentUser"

import getListings from "../actions/getListings"
import PropertiesClient from "./PropertiesClient"
import { ClientOnly } from "@/components/ClientOnly"



const PropertiesPage = async () => {

    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return <EmptyState
            title="No tienes autorización para ver esta página"
            subtitle="Inicia sesión para ver tus reservas"
        />
    }

    const listings = await getListings({
        userId: currentUser.id

    })

    if (listings.length === 0) {
        return <EmptyState
            title="No tienes propiedades"
            subtitle="Parece que no tienes propiedades"
        />
    }

    return (
        // <ClientOnly>
        <PropertiesClient
            listings={listings}
            currentUser={currentUser}
        />
        // </ClientOnly>


    )
}

export default PropertiesPage
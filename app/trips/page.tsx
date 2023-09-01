import { EmptyState } from "@/components/EmptyState"
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import { TripsClient } from "./TripsClient"




const TripsPage = async () => {

    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return <EmptyState
            title="No tienes autorización para ver esta página"
            subtitle="Inicia sesión para ver tus reservas"
        />
    }

    const reservations = await getReservations({
        userId: currentUser.id

    })

    if (reservations.length === 0) {
        return <EmptyState
            title="No tienes reservas"
            subtitle="Explora y reserva experiencias increíbles"
        />
    }

    return (
        <TripsClient
            reservations={reservations}
            currentUser={currentUser}
        />


    )
}

export default TripsPage
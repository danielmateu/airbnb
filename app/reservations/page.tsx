import { EmptyState } from "@/components/EmptyState"
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import { ReservationsClient } from "./ReservationsClient"



const ReservationsPage = async () => {

    const currentUser = await getCurrentUser()

    if (!currentUser) {

        return (
            <EmptyState
                title="No estás autorizado"
                subtitle="Por favor inicia sesión para ver tus reservas."
            />
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    })

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="No tienes reservas"
                subtitle="Cuando hagas una reserva, aparecerá aquí."
            />
        )
    }

    return (
        <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    )

}

export default ReservationsPage
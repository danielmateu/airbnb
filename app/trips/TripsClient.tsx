'use client'

import Container from "@/components/Container"
import { SafeListing, SafeReservation, SafeUser } from "../types"
import { Heading } from "@/components/Heading"
import { useRouter } from "next/navigation"
import { useState, useCallback } from 'react';
import axios from "axios"
import { toast } from "react-hot-toast"
import { ListingCard } from "@/components/listings/ListingCard"

interface TripsClientProps {
    reservations: SafeReservation[]
    currentUser?: SafeUser | null
}

export const TripsClient = ({
    reservations,
    currentUser
}: TripsClientProps) => {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id: string) => {
        setDeletingId(id)
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reserva cancelada')
                router.refresh()
            }).catch((error) => {
                toast.error(error?.response?.data?.error || 'Hubo un error')
            }).finally(() => {
                setDeletingId('')
            })
    }, [router])

    return (
        <Container>
            <Heading
                title="Tus reservas"
                subtitle="Dónde vas y de dónde vienes"
            />
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">

                {
                    reservations.map((reservation) => (
                        <ListingCard
                            key={reservation.id}
                            data={reservation.listing}
                            reservation={reservation}
                            actionId={reservation.id}
                            onAction={onCancel}
                            disabled={deletingId === reservation.id}
                            actionLabel="Cancelar reserva"
                            currentUser={currentUser}

                        />
                    ))
                }
            </div>

        </Container>
    )
}

'use client'

import axios from "axios"
import { toast } from "react-hot-toast"
import { useCallback, useState } from 'react';
import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from '../types/index';
import { Heading } from "@/components/Heading";
import Container from "@/components/Container";
import { ListingCard } from "@/components/listings/ListingCard";



interface ReservationsClientProps {
    reservations: SafeReservation[]
    currentUser: SafeUser
}

export const ReservationsClient = ({
    reservations,
    currentUser
}: ReservationsClientProps) => {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback(async (id: string) => {
        setDeletingId(id)

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reserva cancelada')
                router.refresh()
            }).catch(() => {
                toast.error('No se pudo cancelar la reserva')
            }).finally(() => {
                setDeletingId('')
            })

    }, [router])


    return (
        <Container>
            <Heading
                title="Reservas"
                subtitle="Aquí puedes ver tus reservas."
            />
            <div className="grid mt-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
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

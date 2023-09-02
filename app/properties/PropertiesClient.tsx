'use client'

import { useRouter } from "next/navigation"
import { useState, useCallback } from 'react';
import axios from "axios"
import { toast } from "react-hot-toast"

import { SafeListing, SafeUser } from "../types"

import Container from "@/components/Container"
import { Heading } from "@/components/Heading"
import { ListingCard } from "@/components/listings/ListingCard"

interface PropertiesClientProps {
    listings: SafeListing[],
    currentUser?: SafeUser | null,
}

const PropertiesClient = ({
    listings,
    currentUser
}: PropertiesClientProps) => {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id: string) => {
        setDeletingId(id)
        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success('Listado eliminado')
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
                title="Tu propiedades"
                subtitle="Listado de propiedades"
            />
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">

                {
                    listings.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            data={listing}
                            // listing={listing}
                            actionId={listing.id}
                            onAction={onCancel}
                            disabled={deletingId === listing.id}
                            actionLabel="Eliminar propiedad"
                            currentUser={currentUser}

                        />
                    ))
                }
            </div>

        </Container>
    )
}

export default PropertiesClient

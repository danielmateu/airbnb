'use client'

import { SafeListing, SafeUser } from "@/app/types"
import Container from "@/components/Container";
import { categories } from "@/components/navbar/Categories";
import { Listing, Reservation } from "@prisma/client"
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ListingHead } from "../../app/listings/[listingId]/ListingHead";
import { ListingInfo } from "./ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ListingReservation } from "./ListingReservation";
import { Range } from "react-date-range";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    listing: SafeListing & {
        user: SafeUser
    }
    reservations?: Reservation[]
    currentUser?: SafeUser | null
}

export const ListingClient = ({
    listing,
    reservations = [],
    currentUser
}: ListingClientProps) => {

    const loginModal = useLoginModal()
    const router = useRouter()

    const disabledDates = useMemo(() => {
        let dates: Date[] = []

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })

            dates = [...dates, ...range]
        })
        return dates
    }, [reservations])

    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {

            return loginModal.onOpen()
        }

        setIsLoading(true)

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        }).then((res) => {
            toast.success('Reserva realizada con exito')
            setDateRange(initialDateRange)
            // Redirigir a /trips
            router.refresh()
        }).catch((err) => {
            toast.error('Error al realizar la reserva')
        }).finally(() => {
            setIsLoading(false)
        })

    }, [
        currentUser,
        dateRange,
        listing?.id,
        loginModal,
        router,
        totalPrice
    ])

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate)

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price)
            } else {
                setTotalPrice(listing.price)
            }
        }

    }, [dateRange, listing.price])


    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category)
    }, [listing.category])

    // if (!category) {}

    return (
        <Container>
            <div className="px-4 sm:px-0 max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disableDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

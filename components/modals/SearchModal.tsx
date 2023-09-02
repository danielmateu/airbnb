'use client'

import qs from 'query-string'
import useSearchModal from "@/app/hooks/useSearchModal"
import { Modal } from "./Modal"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { DateRange, Range } from 'react-date-range';
import dynamic from "next/dynamic"
import { CountrySelectValue, CountrySelect } from "../inputs/CountrySelect"
import { formatISO } from 'date-fns'
import { Heading } from '../Heading'
import { Map } from '../Map'
import { Calendar } from '../inputs/Calendar'
import { Counter } from '../inputs/Counter'

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

export const SearchModal = () => {

    const searchModal = useSearchModal()
    const router = useRouter()
    const params = useSearchParams()

    const [location, setLocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATION)
    const [guestCount, setGuestCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    // const Map = useMemo(() => dynamic(() => import('@/components/Map'), {
    //     ssr: false
    // }), [location])

    const onBack = useCallback(() => {
        setStep(step - 1)
    }, [step])

    const onNext = useCallback(() => {
        setStep(step + 1)
    }, [step])

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext()
        }

        let currentQuery = {}

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        },
            { skipNull: true }
        )

        setStep(STEPS.LOCATION)
        searchModal.onClose()
        router.push(url)

    }, [
        bathroomCount,
        dateRange,
        guestCount,
        location,
        onNext,
        params,
        roomCount,
        router,
        searchModal,
        step
    ])

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Buscar'
        }

        return 'Siguiente'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined
        }

        return 'Atrás'
    }, [step])

    let bodyContenet = (
        <div className="flex flex-col gap-8">
            <Heading
                title='¿Dónde vas a ir?'
                subtitle='Encuentra el lugar perfecto para quedarte'
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map
                center={location?.latlng}
            />

        </div>
    )

    if (step === STEPS.DATE) {
        bodyContenet = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='¿Cuándo vas a ir?'
                    subtitle='Mira que las fechas estén disponibles'
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                    disabledDates={[]}
                />

            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContenet = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='¿Cuántos van a ir?'
                    subtitle='Asegurate de que haya espacio para todos'
                />

                <Counter
                    title='Huéspedes'
                    subtitle='Cúantos van a ir'
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter
                    title='Habitaciones'
                    subtitle='Cúantas habitaciones necesitas?'
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter
                    title='Baños'
                    subtitle='Cúantos baños necesitas?'
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        )
    }

    return (
        <Modal isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filtro de búsqueda"
            actionLabel={actionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
            body={bodyContenet}
        />
    )
}

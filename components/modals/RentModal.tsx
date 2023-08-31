'use client'

import useRentModal from "@/app/hooks/useRentModal"

import { useState, useMemo } from 'react';
import { Heading } from "../Heading";
import { categories } from "../navbar/Categories";
import { CategoryInput } from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { CountrySelect } from "../inputs/CountrySelect";
import { Modal } from "./Modal";
import { Map } from '../Map';
import dynamic from "next/dynamic";


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

export const RentModal = () => {

    const router = useRouter()
    const rentModal = useRentModal()
    const [step, setStep] = useState(STEPS.CATEGORY)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathRoomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    })

    const category = watch('category');
    const location = watch('location');
    // const guestCount = watch('guestCount');
    // const roomCount = watch('roomCount');
    // const bathroomCount = watch('bathroomCount');
    // const imageSrc = watch('imageSrc');


    // const Map = useMemo(() => dynamic(() => import('../Map'), {
    //     ssr: false
    // }), [location])


    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldTouch: true,
            shouldDirty: true,
        })
    }

    // Funciones para avanzar y retroceder
    const onBack = () => {
        setStep((value) => value - 1)
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Publicar'
        }

        return 'Siguiente'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }

        return 'Anterior'

    }, [step])

    let bodyContent = (

        <div className="flex flex-col gap-8">
            <Heading
                title="¿Qué categoría describe mejor tu casa?"
                subtitle="Selecciona una categoría"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label}>
                        <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="¿Dónde se encuentra tu alojamiento?"
                    subtitle="Ayuda a tus huéspedes a encontrarte"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />

                <Map center={location?.latlng} />
            </div>

        )
    }

    return (
        <Modal
            title="Reserva tu alojamiento"
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryAction={step !== STEPS.CATEGORY ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
            body={bodyContent}
        />
    )
}

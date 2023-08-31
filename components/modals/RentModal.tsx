'use client'

import useRentModal from "@/app/hooks/useRentModal"

import { useState, useMemo } from 'react';
import { Heading } from '../Heading';
import { categories } from "../navbar/Categories";
import { CategoryInput } from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { CountrySelect } from "../inputs/CountrySelect";
import { Modal } from "./Modal";
import { Map } from '../Map';
import dynamic from "next/dynamic";
import { Counter } from "../inputs/Counter";
import { ImageUpload } from "../inputs/ImageUpload";
import { Input } from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";


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
    const [isLoading, setIsLoading] = useState(false)

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
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    })

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

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

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (step !== STEPS.PRICE) {
            return onNext()
        }

        setIsLoading(true)

        axios.post('/api/listings', data).then(() => {
            toast.success('Tu alojamiento se ha publicado correctamente')
            router.refresh()

            reset()
            setStep(STEPS.CATEGORY)
            rentModal.onClose()
        }).catch(() => {
            toast.error('Ha ocurrido un error al publicar tu alojamiento')
        }).finally(() => {
            setIsLoading(false)
        })
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
            <div className="grid grid-cols-3 sm:grid-cols-4  gap-3 max-h-[50vh] overflow-y-auto">
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

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Comparte información sobre tu alojamiento"
                    subtitle="Qué servicios ofreces"
                />

                <Counter
                    title="Huéspedes"
                    subtitle="¿Cuántas personas pueden alojarse?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter
                    title="Habitaciones"
                    subtitle="¿Cuántas habitaciones tienes disponibles?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title="Baños"
                    subtitle="¿Cuántos baños hay en la casa?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='Una imagen vale más que mil palabras'
                    subtitle='Muestra a tus huéspedes cómo es tu alojamiento'
                />

                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='¿Cómo describirías tu alojamiento?'
                    subtitle='Sé claro y conciso, si es corto y directo mejor'
                />
                <Input
                    id="title"
                    label="Título"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Breve descripción"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='¿Ahora introduce el precio?'
                    subtitle='El precio por noche es el que pagarán tus huéspedes'
                />
                <Input
                    id="price"
                    label="Precio por noche"
                    formatPrice
                    type='number'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal
            title="Reserva tu alojamiento"
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
            body={bodyContent}
        />
    )
}

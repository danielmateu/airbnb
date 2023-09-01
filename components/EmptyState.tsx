'use client'

import { useRouter } from "next/navigation"
import { Heading } from "./Heading"
import { Button } from "./Button"


interface EmptyStateProps {
    title?: string
    subtitle?: string
    showReset?: boolean
}

export const EmptyState = ({
    title = 'No hay nada por aquí',
    subtitle = 'Intenta con otra búsqueda',
    showReset
}: EmptyStateProps) => {

    const router = useRouter()

    return (
        <div className="
            h-[60vh]
            flex flex-col items-center justify-center gap-2
        ">
            <Heading
                title={title}
                subtitle={subtitle}
                center
            />
            <div className="w-48 mt-4">
                {
                    showReset && (
                        <Button
                            onClick={() => router.push('/')}
                            outline
                            label="Eliminar filtros"
                        />
                    )
                }

            </div>
        </div>
    )
}

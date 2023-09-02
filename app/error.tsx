'use client'

import { EmptyState } from "@/components/EmptyState"
import { useEffect } from "react"

interface ErrorStateProps {
    error: Error
}

export const ErrorState = ({
    error
}: ErrorStateProps) => {

    useEffect(() => {
        console.error(error)
    }, [error])
    return (
        <EmptyState
            title="Meh..."
            subtitle="Algo ha salido mal."
        />
    )
}

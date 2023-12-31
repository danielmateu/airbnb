'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { IconType } from "react-icons"
import qs from "query-string"

interface CategoryBoxProps {
    label: string
    icon: IconType
    description: string
    selected?: boolean
}

export const CategoryBox = ({
    label,
    icon: Icon,
    description,
    selected
}: CategoryBoxProps) => {

    const router = useRouter()
    const params = useSearchParams()

    const handleClick = useCallback(() => {
        let currentQuery = {}

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        if (params?.get('category') === label) {
            delete updatedQuery.category
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipEmptyString: true })

        router.push(url)

    }, [label, params, router])

    return (
        <div
            onClick={handleClick}
            className={`flex flex-col items-center justify-center gap-2 p-3 border-b-4  hover:text-neutral-800  dark:text-neutral-400 dark:hover:text-neutral-300 hover:border-b-neutral-400 transition cursor-pointer 
        ${selected ? 'border-b-neutral-800 dark:border-b-neutral-300' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
        
        `}

        >
            <Icon size={26} />
            <div className="font-medium text-sm mb-2">
                {label}
            </div>
        </div>
    )
}

'use client'


import { IconType } from "react-icons"

interface ListingCategoryProps {
    icon: IconType
    label: string
    description: string
}

export const ListingCategory = ({
    icon: Icon,
    label,
    description
}: ListingCategoryProps) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Icon size={32} className="text-neutral-600 dark:text-neutral-300" />
                <div className="flex flex-col">
                    <div className="text-lg font-semibold">
                        {label}
                    </div>
                    <div className="text-neutral-500 darK:text-neutral-200 font-light">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    )
}

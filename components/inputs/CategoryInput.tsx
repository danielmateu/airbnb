'use client'

import { IconType } from "react-icons"

interface CategoryInputProps {
    icon: IconType
    label: string
    selected?: boolean
    onClick: (value: string) => void
}

export const CategoryInput = ({
    icon: Icon,
    label,
    selected = false,
    onClick,
}: CategoryInputProps) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black hover:bg-slate-100 transition cursor-pointer 
            ${selected ? 'border-black' : 'border-gray-200'}`}
        >
            <Icon size={20} />
            <span className="font-semibold">{label}</span>
        </div>
    )
}

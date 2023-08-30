'use client'

import { IconType } from "react-icons"

interface ButtonProps {
    label: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    outline?: boolean
    small?: boolean
    icon?: IconType
}

export const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        relative disable:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-70 transition w-full
        ${outline ? 'bg-white border-black text-black hover:bg-rose-500 transition' : 'bg-rose-500 text-white'}
        ${small ? 'py-1 text-sm font-light border-[1px]' : 'py-3 text-md font-semibold border-2'}
        `}>
            {Icon && (
                <Icon className="absolute left-4 top-4" />
            )}
            {label}
        </button>
    )
}

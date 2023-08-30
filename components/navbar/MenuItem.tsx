'use client'

interface MenuItemProps {
    onClick: () => void
    label: string
}

export const MenuItem: React.FC<MenuItemProps> = ({
    onClick,
    label
}) => {
    return (
        <div
            onClick={onClick}
            className="px-4 py-3 hover:bg-neutral-200 transition font-semibold dark:text-black">
            {label}
        </div>
    )
}

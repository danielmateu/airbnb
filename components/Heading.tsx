'use client'

interface HeadingProps {
    title: string
    subtitle?: string
    center?: boolean
}

export const Heading: React.FC<HeadingProps> = ({
    title,
    subtitle,
    center = false
}) => {
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <div className="text-2xl font-semibold">
                {title}
            </div>
            <div className="font-light text-neutral-500 dark:text-neutral-300 mt-2">
                {subtitle}
            </div>

        </div>
    )
}

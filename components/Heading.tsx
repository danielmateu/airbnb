'use client'

interface HeadingProps {
    title: string
    substitle?: string
    center?: boolean
}

export const Heading: React.FC<HeadingProps> = ({
    title,
    substitle,
    center = false
}) => {
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <div className="text-2xl font-semibold">
                {title}
            </div>
            <div className="font-light text-neutral-500 mt-2">
                {substitle}
            </div>

        </div>
    )
}

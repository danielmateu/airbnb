'use client'

import { PuffLoader } from "react-spinners"

export const Loader = () => {
    return (
        <div className="h-full flex items-center justify-center">
            <PuffLoader
                color={"red"}
                size={150}
            />
        </div>
    )
}

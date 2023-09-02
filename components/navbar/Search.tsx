'use client'

import useSearchModal from "@/app/hooks/useSearchModal"
import { BiSearch } from "react-icons/bi"

export const Search = () => {

    const searchModal = useSearchModal()

    return (
        <div
            onClick={searchModal.onOpen}
            className="
        border-[1px]
        dark:border-0
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
        dark:hover:bg-neutral-700
        ">
            <div className="flex flex-row justify-between items-center text-sm font-semibold">
                <div className="px-6">
                    Dónde
                </div>
                <div className="hidden sm:block border-x-[1px] px-6 flex-1 text-center">
                    Cuando
                </div>
                <div className="pl-6 pr-2 text-gray-600 flex items-center gap-3">
                    <div className="hidden sm:block dark:text-slate-300">Añade invitados</div>
                    <div className="p-2 bg-rose-500 rounded-full text-white ">
                        <BiSearch />
                    </div>
                </div>
            </div>

        </div>
    )
}

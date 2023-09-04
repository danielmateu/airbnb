'use client'
import { TbBeach, TbDiamond, TbMountain, TbPool, TbUfo } from 'react-icons/tb'
import { GiPaperWindmill, GiVillage, GiSurferVan, GiSydneyOperaHouse, GiGreenhouse } from 'react-icons/gi'
import { IoFlameSharp } from 'react-icons/io5'
import { BsTree } from 'react-icons/bs'
import { FaSkiing, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { MdHouseboat, MdOutlineVilla } from 'react-icons/md'
import { PiLighthouseDuotone } from 'react-icons/pi'

import Container from '../Container'

import { CategoryBox } from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'
import { BiBuildingHouse } from 'react-icons/bi'
import { useRef, useState } from 'react';


export const categories = [
    {
        label: 'Campo',
        icon: GiPaperWindmill,
        description: 'En el campo'
    },
    {
        label: 'Playa',
        icon: TbBeach,
        description: 'A pie de playa'
    }, {
        label: 'Montaña',
        icon: TbMountain,
        description: 'En la montaña'
    },
    {
        label: 'Rural',
        icon: GiVillage,
        description: 'En un pueblo'
    },
    {
        label: 'Singular',
        icon: TbUfo,
        description: 'Singulares'
    },
    {
        label: 'Surf',
        icon: GiSurferVan,
        description: 'Surfeando la ola'
    },
    {
        label: 'Populares',
        icon: IoFlameSharp,
        description: 'A la última'
    },
    {
        label: 'Arbol',
        icon: BsTree,
        description: 'Casa del árbol'
    },
    {
        label: 'Nieve',
        icon: FaSkiing,
        description: 'En la nieve'
    },
    {
        label: 'Moderno',
        icon: MdOutlineVilla,
        description: 'Propiedad moderna'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'Con piscina'
    },
    {
        label: 'Lujo',
        icon: TbDiamond,
        description: 'De lujo'
    },
    {
        label: 'Barco',
        icon: MdHouseboat,
        description: 'En el barco'
    },
    {
        label: 'Vistas',
        icon: PiLighthouseDuotone,
        description: 'vistazas'
    },
    {
        label: 'Cultural',
        icon: GiSydneyOperaHouse,
        description: 'Cultural'
    }, {
        label: 'Eco',
        icon: GiGreenhouse,
        description: 'Eco House'
    }, {
        label: 'Ciudad',
        icon: BiBuildingHouse,
        description: 'En la ciudad'
    }
]

export const Categories = () => {

    const params = useSearchParams()
    const category = params?.get('category')
    const pathname = usePathname()
    const rowRef = useRef<HTMLDivElement>(null);
    const [isMoved, setIsMoved] = useState(false)

    const handleClick = (direction: string | undefined) => {
        setIsMoved(true)
        // console.log('rowRef');
        // console.log(rowRef.current)

        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current

            const scrollTo: number = direction === 'left'
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth
            rowRef.current.scrollTo({
                left: scrollTo,
                behavior: 'smooth',
            })
        }
    }

    const isMainPage = pathname === '/'

    if (!isMainPage) {
        return null
    }

    return (
        <Container>
            <div className="group">
                <div ref={rowRef} className="listing_icons relative pt-4 flex items-center  px-0 gap-0 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-auto">
                <FaChevronLeft
                    className="cursor-pointer hover:text-gray-500 transition fixed z-50 left-10 top-[120px] m-2 opacity-0 group-hover:opacity-100"
                    onClick={() => { handleClick('left') }}
                />
                    {categories.map((item) => (
                        <CategoryBox
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                            selected={category === item.label}
                            description={item.description}
                        />
                    ))}
                <FaChevronRight
                    className="cursor-pointer hover:text-gray-500 transition fixed z-50 right-10 top-[120px] m-2 opacity-0 group-hover:opacity-100"
                    onClick={() => { handleClick('right') }}
                />
                </div>
            </div>
        </Container>
    )
}

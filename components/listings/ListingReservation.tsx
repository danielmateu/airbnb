'use client'

import { Range } from 'react-date-range'
import { Calendar } from '../inputs/Calendar'
import { Button } from '../Button'

interface ListingReservationProps {
    price: number
    totalPrice: number
    onChangeDate: (range: Range) => void
    dateRange: Range
    onSubmit: () => void
    disabled: boolean
    disableDates: Date[]
}

export const ListingReservation = ({
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disabled,
    disableDates
}: ListingReservationProps) => {
    return (
        <div className='bg-white rounded-xl border-neutral-200 overflow-hidden'>
            <div className="flex items-center gap-1 p-4">
                <div className="text-2xl font-semibold dark:text-black">
                    €{price}
                </div>
                <p className="font-light text-neutral-600 dark:text-neutral-400">
                    noche
                </p>
            </div>
            <hr />
            <Calendar
                value={dateRange}
                disabledDates={disableDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className="p-4">
                <Button
                    onClick={onSubmit}
                    disabled={disabled}
                    // outline
                    label='Reservar'
                />
            </div>
            <div className="p-4 flex items-center justify-between font-semibold text-lg">
                <div>Total</div>
                <div>€ {totalPrice}</div>
            </div>
        </div >
    )
}
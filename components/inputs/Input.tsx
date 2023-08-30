'use client'

import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'
import { format } from 'util'

interface inputProps {
    id: string
    label: string
    type?: string
    disabled?: boolean
    formatPrice?: boolean
    register: UseFormRegister<FieldValues>
    required?: boolean
    placeholder?: string
    errors: FieldErrors

}

export const Input: React.FC<inputProps> = ({
    id,
    label,
    type = 'text',
    disabled = false,
    formatPrice = false,
    placeholder,
    errors,
    register,
    required
}) => {
    return (
        <div className='w-full relative '>
            {formatPrice && (
                <BiDollar
                    size={20}
                    className='text-neutral-700 absolute top-5 left-2' />
            )}
            <input
                id={id}
                disabled={disabled}
                type={type}
                {...register(id, { required })}
                placeholder=' '
                className={`
                peer w-full p-4 pt-6 font-lgith bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
                ${formatPrice ? 'pl-10' : 'pl-4'}
                ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                `}
            />
            <label
                className={`
                absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
                ${formatPrice ? 'left-10' : 'left-4'}
                ${errors[id] ? 'text-rose-500' : 'text-neutral-500'}
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
                `}
            >
                {label}
            </label>
        </div>
    )
}

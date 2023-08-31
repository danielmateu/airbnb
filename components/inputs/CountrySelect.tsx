'use client'

import useCountries from '@/app/hooks/useCountries';
import Select from 'react-select'

export type ConuntrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
}

interface CountrySelectProps {
    value?: ConuntrySelectValue;
    onChange: (value: ConuntrySelectValue) => void;

}

export const CountrySelect = ({
    value,
    onChange
}: CountrySelectProps) => {

    const { getAll } = useCountries()

    return (
        <div>
            <Select
                placeholder='Cualquier sitio'
                isClearable
                options={getAll()}
                onChange={(value) => onChange(value as ConuntrySelectValue)}
                formatOptionLabel={(option) => (
                    <div className='flex flex-row items-center gap-3'>
                        <div>
                            {option.flag}
                        </div>
                        <div>{option.label}, <span className='text-neutral-500'>{option.region}</span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-2 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg',
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6',
                    }
                })}
            />
        </div>
    )
}

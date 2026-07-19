'use client';

import * as React from 'react';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Input, InputProps } from './input';

type IProps = InputProps & {
    eyeColor?: string;
};
export default function InputPassword({
    className,
    eyeColor = '#56586C',
    ...props
}: IProps) {
    const [show, setShow] = React.useState(false);

    const onToggle = (e: React.PointerEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();

        setShow((prev) => !prev);
    };

    return (
        <div className='relative w-full flex-1'>
            <Input
                {...props}
                className={className}
                type={show ? 'tex' : 'password'}
            />

            <button
                type='button'
                onPointerDown={onToggle}
                className='absolute right-4 top-1/2 -translate-y-1/2 hover:cursor-pointer lg:hover:opacity-80'
            >
                {show ? (
                    <EyeIcon
                        className='h-4 w-4'
                        aria-hidden='true'
                        color={eyeColor}
                    />
                ) : (
                    <EyeOffIcon
                        className='h-4 w-4'
                        aria-hidden='true'
                        color={eyeColor}
                    />
                )}
            </button>
        </div>
    );
}

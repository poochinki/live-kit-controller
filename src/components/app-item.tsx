import { cn } from '@src/lib/utils';
import type { PropsWithChildren, ReactNode } from 'react';
import Copy from './copy';
import IOSLoadingIcon from './ios-loading';
import { Label } from './ui/label';

type ItemProps = {
    className?: string;
    label: string | ReactNode;
    loading?: boolean;
    hasCopy?: boolean;
} & PropsWithChildren;

type WithIconProps = Omit<ItemProps, 'hasCopy'> & {
    icon: ReactNode;
    extra?: ReactNode;
};

function Inline({
    label,
    children,
    className,
    hasCopy = false,
    loading = false,
}: ItemProps) {
    return (
        <div
            className={cn(
                'flex items-center justify-between gap-4 flex-wrap text-sm',
                className,
            )}
        >
            {typeof label === 'string' ? (
                <Label className='font-normal text-gray-600'>{label}</Label>
            ) : (
                label
            )}

            {loading ? (
                <IOSLoadingIcon />
            ) : typeof children == 'string' ? (
                <div className='flex items-center gap-2'>
                    <p
                        className='font-medium'
                        style={{ wordBreak: 'break-word' }}
                    >
                        {children}
                    </p>
                    {hasCopy && !!children && <Copy content={children} />}
                </div>
            ) : (
                children
            )}
        </div>
    );
}

function WithIcon({
    icon,
    label,
    children,
    loading = false,
    className,
    extra,
}: WithIconProps) {
    return (
        <div
            className={cn(
                'p-4 flex items-center gap-2 justify-between flex-wrap',
                className,
            )}
        >
            <div className='space-y-1'>
                <div className='flex items-center gap-2 text-[13px] text-gray-500'>
                    {icon}
                    {label}
                </div>

                {typeof children === 'string' ? (
                    loading ? (
                        <IOSLoadingIcon />
                    ) : (
                        <p className='text-[15px] font-medium'>{children}</p>
                    )
                ) : (
                    children
                )}
            </div>

            {extra}
        </div>
    );
}

export const AppItem = {
    Inline,
    WithIcon,
};

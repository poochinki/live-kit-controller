'use client';

import { Button, ButtonProps } from '@src/components/ui/button';
import { cn } from '@src/lib/utils';

import { Eraser } from 'lucide-react';
import { useTranslations } from 'next-intl';

type IProps = {
    onClear: () => void;
} & ButtonProps;
export default function ButtonClear({ className, onClear, ...props }: IProps) {
    const t = useTranslations('common');
    return (
        <Button
            onClick={onClear}
            variant='outline'
            className={cn(
                'border-red-500 text-red-500 lg:hover:bg-transparent lg:hover:text-red-500 lg:hover:opacity-60',
                className,
            )}
            {...props}
        >
            <Eraser />

            {t('clear')}
        </Button>
    );
}

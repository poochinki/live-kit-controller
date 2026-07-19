'use client';

import { Button, ButtonProps } from '@src/components/ui/button';
import { cn } from '@src/lib/utils';
import { Import } from 'lucide-react';
import { useTranslations } from 'next-intl';

type IProps = {
    onExport: () => void;
} & ButtonProps;

export default function ButtonExport({
    className,
    onExport,
    ...props
}: IProps) {
    const t = useTranslations('common');
    return (
        <Button
            onClick={onExport}
            variant='outline'
            className={cn(
                'border-blue-500 text-blue-500 lg:hover:bg-blue-500 lg:hover:opacity-60',
                className,
            )}
            {...props}
        >
            <Import />

            {t('export')}
        </Button>
    );
}

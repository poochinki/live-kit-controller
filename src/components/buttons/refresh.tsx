'use client';

import { Button, ButtonProps } from '@src/components/ui/button';
import { cn } from '@src/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { RotateCcw } from 'lucide-react';

type IProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryKey: any[];
} & ButtonProps;

export default function ButtonRefresh({
    className,
    queryKey,
    ...props
}: IProps) {
    const queryClient = useQueryClient();

    const onRefect = () => {
        queryClient.refetchQueries({ queryKey: queryKey });
    };

    return (
        <Button
            onClick={onRefect}
            className={cn(
                'bg-primary-pastel border border-green-200 text-primary hover:opacity-65',
                className,
            )}
            {...props}
        >
            <RotateCcw />
        </Button>
    );
}

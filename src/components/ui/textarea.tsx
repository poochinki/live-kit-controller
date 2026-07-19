import * as React from 'react';

import { cn } from '@src/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
    return (
        <textarea
            data-slot='textarea'
            className={cn(
                'text-sm w-full min-w-0 p-3',
                'rounded-lg border outline-none',
                'border-input bg-transparent placeholder:text-gray-400 ',
                'transition-colors',
                'focus-visible:border-input focus-visible:ring-1 focus-visible:ring-primary',
                'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50',
                className,
            )}
            {...props}
        />
    );
}

export { Textarea };

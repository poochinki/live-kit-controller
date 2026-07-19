import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@src/lib/utils';
import IOSLoadingIcon from '../ios-loading';

const buttonVariants = cva(
    [
        'group/button',
        'inline-flex',
        'shrink-0',
        'items-center',
        'justify-center',
        'whitespace-nowrap',
        'font-medium',
        'transition-all',
        'select-none',
        'outline-none',

        'border',
        'border-transparent',
        'bg-clip-padding',

        'hover:cursor-pointer',
        'hover:opacity-90',

        'active:not-aria-[haspopup]:translate-y-px',

        'disabled:pointer-events-none',
        'disabled:opacity-50',

        '[&_svg]:pointer-events-none',
        '[&_svg]:shrink-0',
    ].join(' '),
    {
        variants: {
            variant: {
                default: 'bg-primary text-white',
                cancel: 'border-gray-300 bg-white text-gray-600',
                outline:
                    'border-primary bg-transparent text-primary hover:bg-primary hover:text-white',
                link: 'border-none text-primary underline-offset-2 hover:underline',
                ghost: 'h-auto w-auto border-none bg-transparent p-0 font-normal lg:hover:opacity-70',
            },

            size: {
                xs: 'h-6 rounded-md px-2 gap-1 text-xs [&_svg:not([class*=size-])]:size-3',
                sm: "h-7 text-sm gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
                lg: 'h-9 text-sm rounded-lg gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*=size-])]:size-4',
                default:
                    'h-11 rounded-lg px-3 gap-1.5 text-sm [&_svg:not([class*=size-])]:size-4',
                xl: 'h-12.5 rounded-xl px-4 gap-2 text-[15px] min-w-[120px] [&_svg:not([class*=size-])]:size-4.5',
                icon: 'size-8',
                'icon-xs':
                    "size-4 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
                'icon-sm':
                    'size-5 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
                'icon-lg': 'size-7',
                'icon-xl': 'size-10 rounded-xl',
            },
        },

        defaultVariants: {
            variant: 'default',
        },
    },
);

export type ButtonProps = ButtonPrimitive.Props &
    VariantProps<typeof buttonVariants> & {
        loading?: boolean;
    };

function Button({
    className,
    variant = 'default',
    size,
    loading,
    disabled,
    children,
    ...props
}: ButtonProps) {
    const resolvedSize =
        variant === 'ghost' || variant === 'link'
            ? undefined
            : (size ?? 'default');

    return (
        <ButtonPrimitive
            data-slot='button'
            disabled={loading || disabled}
            className={cn(
                buttonVariants({
                    variant,
                    size: resolvedSize,
                }),
                className,
            )}
            {...props}
        >
            {loading && <IOSLoadingIcon />}
            {children}
        </ButtonPrimitive>
    );
}

export { Button, buttonVariants };

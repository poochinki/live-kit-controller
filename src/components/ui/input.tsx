import { cn } from '@src/lib/utils';

export const INPUT_SIZE_CLASSES = {
    default: {
        height: 'h-10',
        radius: 'rounded-lg',
        padding: 'px-3',
        fonSize: 'text-sm',
    },
    xl: {
        height: 'h-12',
        radius: 'rounded-xl',
        padding: 'px-4',
        fonSize: 'text-[15px]',
    },
} as const;

export type InputSize = keyof typeof INPUT_SIZE_CLASSES;

export type InputProps = {
    size?: InputSize;
} & Omit<React.ComponentProps<'input'>, 'size'>;

function Input({ className, type, size = 'default', ...props }: InputProps) {
    const styles = INPUT_SIZE_CLASSES[size];

    return (
        <input
            type={type}
            data-slot='input'
            className={cn(
                'w-full min-w-0',
                styles.height,
                styles.padding,
                styles.radius,
                styles.fonSize,

                'border border-input',
                'bg-transparent',
                'outline-none',
                'placeholder:text-gray-400',
                'transition-colors',

                'focus-visible:border-input',
                'focus-visible:ring-1',
                'focus-visible:ring-primary',

                'disabled:pointer-events-none',
                'disabled:cursor-not-allowed',
                'disabled:bg-gray-100',
                'disabled:opacity-50',

                className,
            )}
            {...props}
        />
    );
}

export { Input };

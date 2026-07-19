import { formatCurrency } from '@src/lib/number';
import { cn } from '@src/lib/utils';

type IProps = {
    amount?: number | null;
    prefix?: string;
    suffix?: string;
    className?: string;
    fallbackUI?: string;
};

export default function Currency({
    amount,
    prefix,
    suffix = 'đ',
    className,
    fallbackUI,
}: IProps) {
    if (typeof amount === 'undefined' || amount === null)
        return fallbackUI ?? null;

    return (
        <span
            className={cn(
                amount > 0 && 'text-[#00be00]',
                amount < 0 && 'text-red-500',
                className,
            )}
        >
            {prefix}
            {formatCurrency(amount, suffix)}
        </span>
    );
}

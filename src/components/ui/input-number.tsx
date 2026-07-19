import { cn } from '@src/lib/utils';
import {
    type NumberFormatValues,
    NumericFormat,
    NumericFormatProps,
} from 'react-number-format';
import { INPUT_SIZE_CLASSES, InputSize } from './input';
import { APP_CONST } from '@src/_shared/constant/app';

type IProps = {
    afterAddon?: string;
    size?: InputSize;
} & Omit<NumericFormatProps, 'size'>;

export default function InputNumber({
    className,
    afterAddon,
    allowNegative = false,
    value,
    size = 'default',
    ...props
}: IProps) {
    const styles = INPUT_SIZE_CLASSES[size];

    return (
        <div
            className={cn(
                'relative border border-input focus-within:border-input focus-within:ring-1 focus-within:ring-primary',
                styles.height,
                styles.radius,
                className,
            )}
        >
            <NumericFormat
                value={value ?? ''}
                className={cn(
                    'w-full min-w-0 h-full',
                    styles.padding,
                    styles.fonSize,
                    'border-none outline-none',
                    'bg-transparent border-none placeholder:text-gray-400 ',
                    'transition-colors',
                    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50',
                )}
                allowLeadingZeros
                thousandSeparator
                allowNegative={allowNegative}
                autoComplete='off'
                {...props}
            />

            {!!afterAddon && (
                <div className='absolute text-xs text-gray-600 right-0 border-l border-gray-100 inset-y-0 bg-gray-50 rounded-r-lg grid place-items-center h-full px-3'>
                    {afterAddon}
                </div>
            )}
        </div>
    );
}

export const isMaxAmount = (inputObj: NumberFormatValues): boolean => {
    const { floatValue = 0 } = inputObj;
    return floatValue >= 0 && floatValue <= APP_CONST.MAX_AMOUNT_WITHDRAW;
};

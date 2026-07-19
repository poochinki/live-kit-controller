import { cn } from '@src/lib/utils';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useTranslations } from 'next-intl';

type SingleProps = {
    mode: 'single';
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    placeholder?: string;
};

type RangeProps = {
    mode: 'range';
    value?: DateRange;
    onChange?: (range: DateRange | undefined) => void;
    placeholder?: string;
};

type IProps = (SingleProps | RangeProps) &
    DisableDateOptions & {
        className?: string;
    };

export default function CalendarPicker(props: IProps) {
    const t = useTranslations();
    const {
        mode,
        placeholder = 'common.pick-date',
        onChange,
        value,
        disableBefore,
        disableAfter,
        disableFuture,
        disablePast,
        disableToday,
        disabledDates,
        disabled,
    } = props;

    const label =
        mode === 'single'
            ? formatSingle(value as Date)
            : formatRange(value as DateRange);

    const hasValue = !!label;

    const disabledMatcher = buildDisabledMatcher({
        disableBefore,
        disableAfter,
        disableFuture,
        disablePast,
        disableToday,
        disabledDates,
        disabled,
    });

    return (
        <Popover>
            <PopoverTrigger nativeButton={false} render={<div />}>
                <div
                    className={cn(
                        'shadow-none border lg:hover:opacity-60 border-input justify-start text-left font-normal inline-flex min-h-10 px-4 rounded-lg text-sm items-center',
                        !hasValue ? 'text-gray-500' : 'text-black',
                        props.className,
                    )}
                >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {hasValue ? label : <span>{t(placeholder)}</span>}
                </div>
            </PopoverTrigger>

            <PopoverContent className='w-auto p-0'>
                {mode === 'single' ? (
                    <Calendar
                        mode='single'
                        selected={value as Date}
                        onSelect={(date) =>
                            (onChange as SingleProps['onChange'])?.(date)
                        }
                        captionLayout='dropdown'
                        disabled={disabledMatcher}
                    />
                ) : (
                    <Calendar
                        mode='range'
                        selected={value as DateRange}
                        onSelect={(range) =>
                            (onChange as RangeProps['onChange'])?.(range)
                        }
                        captionLayout='dropdown'
                        numberOfMonths={2}
                        disabled={disabledMatcher}
                    />
                )}
            </PopoverContent>
        </Popover>
    );
}

function formatSingle(date?: Date) {
    return date ? dayjs(date).format('DD/MM/YYYY') : null;
}

function formatRange(range?: DateRange) {
    if (!range?.from && !range?.to) return null;
    const from = range?.from ? dayjs(range.from).format('DD/MM/YYYY') : '...';
    const to = range?.to ? dayjs(range.to).format('DD/MM/YYYY') : '...';
    return `${from} - ${to}`;
}

type DisableDateOptions = {
    /** Disable tất cả ngày trước ngày này (không bao gồm ngày này) */
    disableBefore?: Date;
    /** Disable tất cả ngày sau ngày này (không bao gồm ngày này) */
    disableAfter?: Date;
    /** Disable tất cả ngày sau hôm nay */
    disableFuture?: boolean;
    /** Disable tất cả ngày trước hôm nay (bao gồm hôm nay) */
    disablePast?: boolean;
    /** Disable hôm nay */
    disableToday?: boolean;
    /** Disable các ngày cụ thể */
    disabledDates?: Date[];
    /** Disable theo custom matcher */
    disabled?: (date: Date) => boolean;
};
function buildDisabledMatcher(options: DisableDateOptions) {
    const {
        disableBefore,
        disableAfter,
        disableFuture,
        disablePast,
        disableToday,
        disabledDates,
        disabled,
    } = options;

    const matchers: ((date: Date) => boolean)[] = [];

    if (disableBefore) {
        matchers.push((d) => dayjs(d).isBefore(dayjs(disableBefore), 'day'));
    }

    if (disableAfter) {
        matchers.push((d) => dayjs(d).isAfter(dayjs(disableAfter), 'day'));
    }

    if (disableFuture) {
        matchers.push((d) => dayjs(d).isAfter(dayjs(), 'day'));
    }

    if (disablePast) {
        matchers.push((d) => dayjs(d).isBefore(dayjs(), 'day'));
    }

    if (disableToday) {
        matchers.push((d) => dayjs(d).isSame(dayjs(), 'day'));
    }

    if (disabledDates?.length) {
        matchers.push((d) =>
            disabledDates.some((dd: Date) => dayjs(d).isSame(dayjs(dd), 'day')),
        );
    }

    if (disabled) {
        matchers.push(disabled);
    }

    if (!matchers.length) return undefined;

    // OR logic: disable nếu bất kỳ matcher nào match
    return (date: Date) => matchers.some((fn) => fn(date));
}

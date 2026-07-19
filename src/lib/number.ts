import numeral from 'numeral';
import cookieService from './cookies';

export function convertStringToNumber(value: string | number): number {
    if (!value) return 0;

    return numeral(value)?.value() ?? 0;
}

type CurrencyValue = {
    vnd: number;
    cny: number;
    usd: number;
};

export function formatCurrency(value: number, cur = ' đ') {
    return numeral(value || 0).format('0,0') + cur;
}

export function formatNumberCompact(number: number) {
    if (number >= 1_000_000_000) {
        return (number / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (number >= 1_000_000) {
        return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (number >= 1_000) {
        return (number / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return number.toString();
}

const currencyMap = {
    VND: 'đ',
    CNY: '¥',
    USD: '$',
};

type Currency = keyof typeof currencyMap;

export function formatNumberByCurrency(
    value: number | CurrencyValue,
    isAmountDetail = false,
    backup: number | string | null = null,
    _currency: Currency | null = null,
) {
    const currency =
        _currency ?? (cookieService.currency.get() as Currency | null);

    const currentCurrency = currency ?? 'VND';
    let rawValue: number;

    if (isAmountDetail && typeof value === 'object') {
        rawValue =
            currentCurrency === 'CNY'
                ? value.cny
                : currentCurrency === 'USD'
                  ? value.usd
                  : value.vnd;
    } else {
        rawValue = typeof value === 'number' ? value : value.vnd;
    }

    const isForeign = currentCurrency === 'CNY' || currentCurrency === 'USD';

    let formatted: string;
    let symbol = currencyMap[currentCurrency];

    if (isForeign) {
        const isNegative = rawValue < 0;
        const absValue = Math.abs(rawValue);

        formatted = absValue.toFixed(2);
        if (isNegative) {
            symbol = '-' + symbol;
        }
    } else {
        formatted = Math.floor(rawValue).toString();
    }

    if ((formatted === '0' || formatted === '0.00') && backup !== null) {
        formatted = String(backup);
    }

    const withComma = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return isForeign ? `${symbol}${withComma}` : `${withComma} ${symbol}`;
}

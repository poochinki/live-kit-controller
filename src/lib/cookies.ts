import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const CONST = {
    TOKEN: 'TOKEN',
    LOCALE: 'LOCALE',
    CURRENCY: 'CURRENCY',
};

const APP_COOKIES = Object.keys(CONST);

function create(key: string, fallback?: string) {
    return {
        set: (value: string) => setCookie(key, value),
        get: () => {
            const v = getCookie(key);
            return (v || fallback) as string;
        },
        delete: () => deleteCookie(key),
    };
}

function deleteAll() {
    APP_COOKIES.map((cookie) => {
        deleteCookie(cookie);
    });
}

const token = create(CONST.TOKEN);
const locale = create(CONST.LOCALE, 'vi');
const currency = create(CONST.CURRENCY, 'vi');

const cookieService = {
    token,
    locale,
    currency,
    deleteAll,
};

export default cookieService;

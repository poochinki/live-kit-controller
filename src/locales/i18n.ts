'use server';

import { APP_CONST } from '@src/lib/const';
import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
    const store = await cookies();
    const locale = store.get(APP_CONST.LOCALE)?.value || 'vi';

    return {
        locale,
        messages: (await import(`./${locale}.json`)).default,
    };
});

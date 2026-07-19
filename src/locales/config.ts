import { Locale } from './types';

export const LANGUAGE: {
    [key: string]: {
        shortName: string;
        viName: string;
        enName: string;
        icon: string;
    };
} = {
    [Locale.VI]: {
        shortName: 'Tiếng Việt',
        viName: 'Tiếng Việt',
        enName: 'Vietnamese',
        icon: '/icons/lang/vi.svg',
    },
    [Locale.EN]: {
        shortName: 'English',
        viName: 'Tiếng anh',
        enName: 'English',
        icon: '/icons/lang/en.svg',
    },
};

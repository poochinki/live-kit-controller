/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import crypto from 'crypto';
import { customAlphabet } from 'nanoid';
import { twMerge } from 'tailwind-merge';
import { checkingService } from './checking';
import cookieService from './cookies';
import { appHelper } from './helper';

export const removeSignOfString = (str: string) =>
    str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');

export function cleanObject<T extends Record<string, unknown>>(
    obj: T,
    converts?: Partial<Record<keyof T, 'number' | 'string'>>,
): Partial<T> {
    if (
        !obj ||
        typeof obj !== 'object' ||
        Array.isArray(obj) ||
        obj instanceof Date
    ) {
        return obj;
    }

    return Object.entries(obj).reduce((acc, [k, v]) => {
        const value = typeof v === 'string' ? v.trim() : v;

        if (checkingService.empty(value)) return acc;

        if (
            typeof value === 'object' &&
            !Array.isArray(value) &&
            !(value instanceof Date)
        ) {
            const nested = cleanObject(value as Record<string, unknown>);
            if (Object.keys(nested).length === 0) return acc;
            return { ...acc, [k]: nested };
        }

        const convertType = converts?.[k as keyof T];
        const finalValue = convertType
            ? appHelper.convertValue(value, convertType)
            : value;

        return { ...acc, [k]: finalValue };
    }, {} as Partial<T>);
}

export function pick<T extends object, K extends keyof T>(
    obj: T,
    ...keys: K[]
): Pick<T, K> {
    return keys.reduce(
        (acc, key) => {
            if (key in obj) acc[key] = obj[key];
            return acc;
        },
        {} as Pick<T, K>,
    );
}

export function generateId(length: number) {
    return customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', length)();
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function parseJSON<T = any>(value: string): T | null {
    try {
        return JSON.parse(value);
    } catch (_) {
        return null;
    }
}

export function normalizeVNText(str: string = '') {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}

export function fallbackArr(data: any) {
    return Array.isArray(data) ? data : [];
}

export function throwError(error?: string, fallback?: string): never {
    const fallbackError =
        cookieService.locale.get() === 'vi'
            ? 'Có lỗi xảy ra, vui lòng thử lại'
            : 'Some thing went wrong, try again!';
    throw new Error(error ?? fallback ?? fallbackError);
}

export function encryptPassword(password: string) {
    if (!password) return '';

    return crypto.createHash('sha256').update(password.trim()).digest('hex');
}

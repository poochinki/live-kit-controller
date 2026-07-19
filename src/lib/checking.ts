import { regexService } from './regex';

// ============================================================================
// Checking is phone number
// ============================================================================
function phone(phone: string) {
    if (!phone) return false;
    return regexService.phone.test(phone);
}

// ============================================================================
// Checking is image
// ============================================================================
function image(path: string) {
    return ['jpg', 'jpeg', 'png'].includes(
        path?.split?.('.').pop()?.toLowerCase() || '',
    );
}

// ============================================================================
// Checking is empty value
// ============================================================================
function empty(v: unknown) {
    return (
        v === null ||
        v === undefined ||
        v === '' ||
        (Array.isArray(v) && !v.length)
    );
}

// ============================================================================
// Checking is object has value
// ============================================================================
function objectHasValue(data: Record<string, unknown>) {
    return Object.values(data).some(Boolean);
}

export const checkingService = {
    phone,
    image,
    empty,
    objectHasValue,
};

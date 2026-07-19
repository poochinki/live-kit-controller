import { toast } from 'sonner';

// ============================================================================
// imgLoader for Next Image
// ============================================================================
function imgLoader({
    src,
    width,
    quality = 75,
}: {
    src: string;
    width: number;
    quality?: number;
}) {
    const local = ['img', 'icons'].includes(src);
    return local
        ? `/${src}`
        : `${process.env.NEXT_PUBLIC_API_UPLOAD}/${src}?w=${width}&q=${quality}`;
}

// ============================================================================
// convertValue: Convert any value to string or number
// ============================================================================
type Convert = 'number' | 'string';
function convertValue(value: unknown, type: Convert): unknown {
    if (type === 'number') {
        const num = Number(value);
        return isNaN(num) ? value : num;
    }
    if (type === 'string') {
        return String(value);
    }
    return value;
}

// ============================================================================
// copy
// ============================================================================
function copy(text: string, message?: string) {
    if (typeof navigator === 'undefined') return;

    navigator.clipboard.writeText(text).then(
        () => {
            toast.success(message || 'Copied successfully!');
        },
        (error) => {
            console.log('Error went copy to clipboard: ', error);
        },
    );
}

export const appHelper = {
    imgLoader,
    convertValue,
};

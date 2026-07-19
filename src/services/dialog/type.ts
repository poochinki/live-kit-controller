import { buttonVariants } from '@src/components/ui/button';
import type { VariantProps } from 'class-variance-authority';

import type { ReactNode } from 'react';

export type DialogMessageType = 'error' | 'success' | 'warning' | 'pending';

export type DialogButton = VariantProps<typeof buttonVariants> & {
    nameButton?: string;
    className?: string;
    preventClose?: boolean;
    onClick?: () => void;
};

export type DialogMessage = DialogButton &
    Pick<
        DialogPayload,
        'title' | 'className' | 'closeOutside' | 'buttons' | 'footer'
    > & {
        description?: string | ReactNode;
        hiddenButton?: boolean;
    };

export type DialogSubmitResult = { success: boolean; message?: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DialogSubmitHandler<T = any> = (
    value: T,
) => Promise<DialogSubmitResult>;

export type DialogPayload = {
    id: string;
    showCloseButton?: boolean;
    title?: string | ReactNode;
    className?: string;
    content?: ReactNode;
    buttons?: DialogButton[];
    closeOutside?: boolean;
    footer?: ReactNode;
    onClose?: () => void;
    translateTitle?: boolean;
};

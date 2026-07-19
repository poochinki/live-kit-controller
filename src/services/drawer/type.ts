import type { ReactNode } from 'react';
import type { Drawer as DrawerPrimitive } from 'vaul-base';

type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root>;

export type DrawerPayload = {
    id: string;
    title: string | ReactNode;
    className?: string;
    content: ReactNode | ((id: string) => ReactNode);
    closeOutside?: boolean;
    onClose?: () => void;
    props?: Omit<DrawerProps, 'open' | 'onOpenChange' | 'onClose'>;
};

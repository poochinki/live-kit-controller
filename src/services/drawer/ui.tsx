import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from '@src/components/ui/drawer';
import useDrawerStore from './store';
import type { Drawer as DrawerPrimitive } from 'vaul-base';
import { cn } from '@src/lib/utils';
import { X } from 'lucide-react';

export default function DrawerHost() {
    const drawer = useDrawerStore((s) => s.drawer);
    const onClose = useDrawerStore((s) => s.close);

    if (!drawer?.id) return null;

    const content =
        typeof drawer.content === 'function'
            ? drawer.content(drawer.id)
            : drawer.content;

    return (
        <Drawer
            open={!!drawer.id}
            onClose={onClose}
            {...(drawer.props as React.ComponentProps<
                typeof DrawerPrimitive.Root
            >)}
        >
            <DrawerContent
                className={cn(
                    'data-[vaul-drawer-direction=right]:rounded-none data-[vaul-drawer-direction=left]:rounded-none',
                    drawer?.className,
                )}
            >
                <DrawerHeader className='flex items-center justify-between flex-row'>
                    <DrawerTitle>{drawer.title}</DrawerTitle>
                    <div
                        onClick={onClose}
                        className='lg:hover:opacity-60 hover:cursor-pointer'
                    >
                        <X size={18} />
                    </div>
                </DrawerHeader>
                {content}
            </DrawerContent>
        </Drawer>
    );
}

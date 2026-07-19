'use client';

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { XIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@src/components/ui/button';
import { cn } from '@src/lib/utils';
import { DialogStackContext, DialogStackCtx } from '../contexts/dialog';

let counter = 1000;
export const zIndexManager = {
    next: () => ++counter,
    release: () => {
        counter = Math.max(1000, --counter);
    },
};

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
    return <DialogPrimitive.Root data-slot='dialog' {...props} />;
}

function DialogTrigger({ className, ...props }: DialogPrimitive.Trigger.Props) {
    return (
        <DialogPrimitive.Trigger
            data-slot='dialog-trigger'
            className={cn('hover:cursor-pointer', className)}
            {...props}
        />
    );
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
    return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
    return <DialogPrimitive.Close data-slot='dialog-close' {...props} />;
}

function DialogOverlay({
    className,
    ...props
}: DialogPrimitive.Backdrop.Props) {
    return (
        <DialogPrimitive.Backdrop
            data-slot='dialog-overlay'
            className={cn(
                'fixed inset-0 isolate bg-black/50 backdrop-blur-lg duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
                className,
            )}
            {...props}
        />
    );
}

function DialogContent({
    className,
    children,
    showCloseButton = true,
    ref,
    style,
    ...props
}: DialogPrimitive.Popup.Props & {
    showCloseButton?: boolean;
    ref?: React.Ref<HTMLDivElement>;
}) {
    const id = React.useId();

    const parentCtx = React.useContext(DialogStackContext);

    const [childOpenCount, setChildOpenCount] = React.useState(0);
    const isScaled = childOpenCount > 0;

    const cleanupRef = React.useRef<(() => void) | null>(null);

    const handleRef = React.useCallback(
        (node: HTMLDivElement | null) => {
            // Forward ref ra ngoài nếu caller truyền vào
            if (typeof ref === 'function') ref(node);
            else if (ref)
                (ref as React.RefObject<HTMLDivElement | null>).current = node;

            if (!parentCtx) return;

            if (node) {
                cleanupRef.current = parentCtx.onChildOpen();
            } else {
                cleanupRef.current?.();
                cleanupRef.current = null;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [parentCtx],
    );

    const [zIndex] = React.useState(() => zIndexManager.next());

    // React.useEffect(() => {
    //     return () => zIndexManager.release();
    // }, []);

    const ctxValue: DialogStackCtx = React.useMemo(
        () => ({
            onChildOpen: () => {
                setChildOpenCount((n) => n + 1);
                return () => setChildOpenCount((n) => n - 1);
            },
        }),
        [],
    );

    return (
        <DialogStackContext.Provider value={ctxValue}>
            <DialogPortal>
                {!parentCtx && <DialogOverlay style={{ zIndex: zIndex - 1 }} />}
                <DialogPrimitive.Popup
                    ref={handleRef}
                    data-dialog-id={id}
                    data-slot='dialog-content'
                    style={{
                        ...style,
                        zIndex,
                        transform: isScaled
                            ? 'scale(0.94) translateY(-10px)'
                            : 'scale(1) translateY(0px)',
                        opacity: isScaled ? 0.55 : 1,
                        filter: isScaled ? 'blur(1.5px)' : 'none',
                        transition:
                            'transform 0.22s ease, opacity 0.22s ease, filter 0.22s ease',
                    }}
                    className={cn(
                        'fixed top-1/2 left-1/2 z-50 grid bg-white -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl p-6 pt-5 text-sm shadow-lg duration-100 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 overflow-y-scroll overflow-x-hidden no-scrollbar w-[calc(100%-1.25rem)] max-w-125 max-h-[90dvh]',
                        className,
                    )}
                    {...props}
                >
                    {children}
                    {showCloseButton && (
                        <DialogPrimitive.Close
                            data-slot='dialog-close'
                            render={
                                <Button
                                    className='absolute top-2 text-black p-5.5 pt-4.5 right-2 bg-transparent border-none outline-none hover:cursor-pointer active:scale-105 transition-transform duration-150 ease-out hover:opacity-80'
                                    size='icon-sm'
                                >
                                    <XIcon />
                                    <span className='sr-only'>Close</span>
                                </Button>
                            }
                        />
                    )}
                </DialogPrimitive.Popup>
            </DialogPortal>
        </DialogStackContext.Provider>
    );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot='dialog-header'
            className={cn('flex flex-col gap-2', className)}
            {...props}
        />
    );
}

function DialogFooter({
    className,
    showCloseButton = false,
    children,
    ...props
}: React.ComponentProps<'div'> & {
    showCloseButton?: boolean;
}) {
    return (
        <div
            data-slot='dialog-footer'
            className={cn(
                '-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end',
                className,
            )}
            {...props}
        >
            {children}
            {showCloseButton && (
                <DialogPrimitive.Close
                    render={<Button variant='outline'>Close</Button>}
                />
            )}
        </div>
    );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
    return (
        <DialogPrimitive.Title
            data-slot='dialog-title'
            className={cn('text-lg leading-none font-semibold', className)}
            {...props}
        />
    );
}

function DialogDescription({
    className,
    ...props
}: DialogPrimitive.Description.Props) {
    return (
        <DialogPrimitive.Description
            data-slot='dialog-description'
            className={cn(
                'text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
                className,
            )}
            {...props}
        />
    );
}

export {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
};

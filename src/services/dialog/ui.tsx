import { cn } from '@src/lib/utils';

import AppImage from '@src/components/app-image';
import { Button } from '@src/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@src/components/ui/dialog';
import { useTranslations } from 'next-intl';
import useDialogStore from './store';
import { DialogMessage, DialogMessageType } from './type';

export default function DialogHost() {
    const t = useTranslations();

    const stacks = useDialogStore((s) => s.stack);
    const onClose = useDialogStore((s) => s.close);

    if (!stacks?.length) return null;

    return (
        <>
            {stacks.map((dialog, index) => {
                const isTop = index === stacks.length - 1;

                const content = dialog?.content;

                const isTransalateTitle =
                    !!dialog?.title &&
                    dialog?.translateTitle &&
                    typeof dialog.title === 'string';

                return (
                    <Dialog
                        key={dialog?.id}
                        open
                        disablePointerDismissal={!dialog.closeOutside && isTop}
                        onOpenChange={(open) => {
                            if (!open && isTop) {
                                onClose?.();
                            }
                        }}
                    >
                        <DialogContent
                            showCloseButton={dialog?.showCloseButton ?? true}
                            className={cn('p-6 gap-0 pb-7', dialog.className)}
                        >
                            <DialogHeader
                                className={!dialog?.title ? 'sr-only' : ''}
                            >
                                <DialogTitle>
                                    {isTransalateTitle
                                        ? t(dialog.title as string)
                                        : dialog?.title}
                                </DialogTitle>
                            </DialogHeader>

                            <div className='flex flex-col gap-10 min-w-0'>
                                {content}

                                {dialog?.footer
                                    ? dialog.footer
                                    : dialog?.buttons?.length && (
                                          <div
                                              className={cn(
                                                  'grid gap-4 p-0 grid-cols-1 border-transparent',
                                                  dialog.buttons.length >= 2 &&
                                                      'grid-cols-2',
                                              )}
                                          >
                                              {dialog.buttons.map((btn, i) => (
                                                  <Button
                                                      key={i}
                                                      variant={btn.variant}
                                                      onClick={btn.onClick}
                                                      className={
                                                          btn?.className ?? ''
                                                      }
                                                  >
                                                      {t(
                                                          btn.nameButton as string,
                                                      )}
                                                  </Button>
                                              ))}
                                          </div>
                                      )}
                            </div>
                        </DialogContent>
                    </Dialog>
                );
            })}
        </>
    );
}

type IDialogContentProps = Omit<
    DialogMessage,
    'preventClose' | 'hiddenButton'
> & {
    type: DialogMessageType;
};

export function IDialogContent({
    type,
    title,
    description,
}: IDialogContentProps) {
    return (
        <div>
            <div className='grid place-items-center mb-6'>
                <AppImage
                    path={`/icons/dialog/${type}.png`}
                    sizes='100vw'
                    className='size-25 object-contain'
                />
            </div>

            <div className='text-center'>
                {title &&
                    (typeof title === 'string' ? (
                        <p
                            style={{ wordBreak: 'break-word' }}
                            className={cn(
                                'text-lg font-semibold text-black',
                                type === 'success' && 'text-green-500',
                                type === 'warning' && 'text-yellow-500',
                                type === 'error' && 'text-red-500',
                            )}
                        >
                            {title}
                        </p>
                    ) : (
                        title
                    ))}
                {!!description &&
                    (typeof description === 'string' ? (
                        <p
                            style={{ wordBreak: 'break-word' }}
                            className='text-gray-700 text-base'
                        >
                            {description}
                        </p>
                    ) : (
                        description
                    ))}
            </div>
        </div>
    );
}

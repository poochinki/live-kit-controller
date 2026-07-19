import { cn } from '@src/lib/utils';
import useDialogStore from './store';
import { DialogMessage, DialogMessageType, DialogPayload } from './type';
import { IDialogContent } from './ui';

export const dialogService = {
    open(
        options:
            | Omit<DialogPayload, 'id'>
            | ((id: string) => Omit<DialogPayload, 'id'>),
    ) {
        return useDialogStore.getState().open(options);
    },
    close() {
        useDialogStore.getState().close();
    },
    closeById(id: string) {
        useDialogStore.getState().closeById(id);
    },
    success(props: DialogMessage) {
        return genDialogMessage({ type: 'success', ...props });
    },
    error(props: DialogMessage) {
        return genDialogMessage({ type: 'error', ...props });
    },
    warning(props: DialogMessage) {
        return genDialogMessage({ type: 'warning', ...props });
    },
    pending(props: DialogMessage) {
        return genDialogMessage({ type: 'pending', ...props });
    },
};

function genDialogMessage({
    nameButton,
    onClick,
    buttons,
    className,
    preventClose,
    hiddenButton,
    footer,
    ...props
}: DialogMessage & { type: DialogMessageType }) {
    return useDialogStore.getState().open({
        className: cn('px-8 pt-9 max-w-[420px]', className),
        content: IDialogContent({
            ...props,
        }),
        footer: footer,
        ...(hiddenButton || footer
            ? {}
            : !!buttons?.length
              ? { buttons }
              : {
                    buttons: [
                        {
                            nameButton: nameButton ?? 'common.confirm',
                            onClick: () => {
                                if (!preventClose) {
                                    dialogService.close();
                                }
                                onClick?.();
                            },
                        },
                    ],
                }),
    });
}

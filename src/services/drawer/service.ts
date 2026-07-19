import useDialogStore from './store';
import { DrawerPayload } from './type';

export const drawerService = {
    open(options: Omit<DrawerPayload, 'id'>) {
        return useDialogStore.getState().open(options);
    },
    close() {
        useDialogStore.getState().close();
    },
};

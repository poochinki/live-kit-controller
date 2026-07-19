import { create } from 'zustand';
import { DrawerPayload } from './type';

type IProps = {
    drawer?: DrawerPayload;
    open: (drawer: Omit<DrawerPayload, 'id'>) => string;
    close: () => void;
};

const useDrawerStore = create<IProps>((set) => ({
    drawer: undefined,
    open: (drawer) => {
        const id = crypto.randomUUID();
        set(() => ({
            drawer: { ...drawer, id },
        }));
        return id;
    },
    close: () => {
        set({ drawer: undefined });
    },
}));

export default useDrawerStore;

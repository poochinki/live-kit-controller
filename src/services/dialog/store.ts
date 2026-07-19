import { create } from 'zustand';
import { DialogPayload } from './type';

type OpenOptions =
    | Omit<DialogPayload, 'id'>
    | ((id: string) => Omit<DialogPayload, 'id'>);

type IProps = {
    stack: DialogPayload[];
    open: (options: OpenOptions) => string;
    closeById: (id: string) => void;
    close: () => void;
};

const useDialogStore = create<IProps>((set, get) => ({
    stack: [],
    open: (options) => {
        const id = crypto.randomUUID();
        const dialog = typeof options === 'function' ? options(id) : options;
        set((state) => ({ stack: [...state.stack, { ...dialog, id }] }));
        return id;
    },
    closeById: (id) =>
        set((s) => ({
            stack: s.stack.filter((d) => d.id !== id),
        })),
    close: () => {
        const top = get().stack.at(-1);
        top?.onClose?.();

        set((state) => ({
            stack: state.stack.slice(0, -1),
        }));
    },
}));

export default useDialogStore;

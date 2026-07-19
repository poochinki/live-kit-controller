import { createContext } from 'react';

export type DialogStackCtx = {
    onChildOpen: () => () => void;
};

export const DialogStackContext = createContext<DialogStackCtx | null>(null);

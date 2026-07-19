'use client';

import DialogHost from '@src/services/dialog/ui';
import DrawerHost from '@src/services/drawer/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchInterval: false,
            retry: false,
            gcTime: 0,
        },
    },
});

queryClient.setQueryDefaults(['account'], {
    gcTime: 30 * 1000,
});

export default function ClientProvider({ children }: PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            <>{children}</>
            <DialogHost />
            <DrawerHost />
            <Toaster richColors position='top-center' />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    );
}

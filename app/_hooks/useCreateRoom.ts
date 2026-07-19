import { throwError } from '@src/lib/utils';
import { dialogService } from '@src/services/dialog/service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function useCreateRoom() {
    const router = useRouter();

    const { mutate: onCreate, isPending: loading } = useMutation<
        string,
        Error,
        { title: string }
    >({
        mutationFn: async ({ title }) => {
            const res = await fetch('http://localhost:3001/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': '92139d0923',
                },
                body: JSON.stringify({ title }),
            });
            if (!res.ok) throwError((await res.json()).error);
            const { roomId } = await res.json();
            return roomId;
        },
        onSuccess(roomId) {
            router.push(`/room/${roomId}`);
        },
        onError(error) {
            dialogService.error({ description: error?.message });
        },
    });

    return { onCreate, loading };
}

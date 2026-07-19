import { throwError } from '@src/lib/utils';
import { useQuery } from '@tanstack/react-query';

type IProps = {
    id: string;
};

export default function useQueryRoom({ id }: IProps) {
    const { data, isLoading } = useQuery({
        queryKey: ['ROOM', id],
        queryFn: async () => {
            const res = await fetch('http://localhost:3001/get-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': '92139d0923',
                },
                body: JSON.stringify({ room: id, name: 'Host' }),
            });
            if (!res.ok) throwError((await res.json()).error);
            const data = (await res.json()) as { token: string; role: string };

            return data;
        },
        enabled: !!id,
    });

    return { room: data, loading: isLoading };
}

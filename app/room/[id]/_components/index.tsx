'use client';

import Empty from '@src/components/empty';
import Fetching from '@src/components/fetching';
import useQueryRoom from '../_hooks/useQueryRoom';
import Livestream from './livestream';

type IProps = {
    id: string;
};
export default function Room({ id }: IProps) {
    const { loading, room } = useQueryRoom({
        id,
    });

    console.log({ room });
    const { token } = room ?? {};

    if (loading) {
        return (
            <div className='p-10'>
                <Fetching loading />
            </div>
        );
    }

    if (!loading && !token)
        return (
            <div className='p-10'>
                <Empty />;
            </div>
        );

    return <Livestream token={token as string} />;
}

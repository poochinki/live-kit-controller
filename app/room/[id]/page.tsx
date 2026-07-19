import { Metadata } from 'next';
import Room from './_components';

export const metadata: Metadata = {
    title: 'Livestream',
};

type IProps = {
    params: Promise<{ id: string }>;
};

export default async function Page({ params }: IProps) {
    const id = (await params)?.id;

    return <Room id={id} />;
}

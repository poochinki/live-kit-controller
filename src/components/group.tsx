import { useTranslations } from 'next-intl';

export default function GroupEnum({ state }: { state: string }) {
    const t = useTranslations('group');

    return <span>{t(state)}</span>;
}

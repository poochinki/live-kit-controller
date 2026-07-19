import { useTranslations } from 'next-intl';
import IOSLoadingIcon from './ios-loading';
import { cn } from '@src/lib/utils';

type IProps = {
    loading: boolean;
    message?: string;
    className?: string;
};

export default function Fetching({ loading, className, message }: IProps) {
    const t = useTranslations('common');

    if (!loading) return null;

    return (
        <div
            className={cn('flex items-center gap-2 justify-center', className)}
        >
            <IOSLoadingIcon />
            {message || t('loading')}
        </div>
    );
}

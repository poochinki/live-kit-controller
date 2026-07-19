import useHydration from '@src/_shared/hooks/web/useHydration';
import IOSLoadingIcon from '@src/components/ios-loading';
import { APP_CONST } from '@src/_shared/constant/app';
import { useTranslations } from 'next-intl';

function SkeletonRow({ columns }: { columns: number }) {
    const hydration = useHydration();

    if (hydration) return null;

    return (
        <div className='flex px-4 py-3 gap-3'>
            {Array.from({ length: columns }).map((_, i) => (
                <div
                    key={i}
                    className='h-4 flex-1 animate-pulse rounded bg-input'
                />
            ))}
        </div>
    );
}

export function TableSkeleton({ rows = APP_CONST.LIMIT_PAGE, columns = 5 }) {
    return (
        <div className='size-full'>
            {Array.from({ length: rows }).map((_, i) => (
                <SkeletonRow key={i} columns={columns} />
            ))}
        </div>
    );
}

export function TableFetching() {
    const t = useTranslations('table-data-component');

    return (
        <div className='absolute inset-0 backdrop-blur-xs flex items-center justify-center gap-2 text-sm font-medium text-pink-500'>
            <IOSLoadingIcon />
            {t('fetching')}
        </div>
    );
}

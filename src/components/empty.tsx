import AppImage from '@src/components/app-image';
import { cn } from '@src/lib/utils';
import { useTranslations } from 'next-intl';

type IProps = {
    className?: string;
};
export default function Empty({ className }: IProps) {
    const t = useTranslations('common');
    return (
        <div
            className={cn(
                'flex flex-col gap-2 items-center text-gray-600 text-sm text-center',
                className,
            )}
        >
            <AppImage
                path='/icons/common/empty.png'
                className='w-18 object-contain'
            />
            {t('empty')}
        </div>
    );
}

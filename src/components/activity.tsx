import { cn } from '@src/lib/utils';
import { useTranslations } from 'next-intl';

type IProps = {
    className?: string;
    content?: string;
    active: boolean;
};

export default function Activity({ active, content, className }: IProps) {
    const t = useTranslations('common');

    return (
        <div className={cn('flex items-center gap-2 text-sm', className)}>
            <div
                className={cn(
                    'size-2 rounded-full',
                    active ? 'bg-green-500' : 'bg-red-500',
                )}
            />
            <p style={{ wordBreak: 'break-word' }} className='flex-1'>
                {!!content ? content : t(active ? 'active' : 'inactive')}
            </p>
        </div>
    );
}

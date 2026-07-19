import { cn } from '@src/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Check, CopyIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

type IProps = {
    content: string;
    className?: string;
};

export default function Copy({ content, className }: IProps) {
    const t = useTranslations('copy');

    const [hasCopy, setHasCopy] = useState(false);
    const [open, setOpen] = useState(false);

    const onCopy = () => {
        if (typeof navigator === 'undefined') return;

        navigator.clipboard.writeText(content).then(
            () => {
                setHasCopy(true);
            },
            (error) => {
                console.log('Error went copy to clipboard: ', error);
            },
        );
    };

    useEffect(() => {
        return () => {
            setHasCopy(false);
        };
    }, [open]);

    if (!content) return null;

    return (
        <Tooltip open={open} onOpenChange={setOpen}>
            <TooltipTrigger
                closeOnClick={false}
                delay={50}
                onClick={onCopy}
                className='outline-0 outline-none'
            >
                <div
                    className={cn(
                        'text-primary hover:cursor-pointer lg:hover:opacity-55',
                        className,
                    )}
                >
                    <CopyIcon size={16} />
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <div className=' text-xs'>
                    {hasCopy ? (
                        <div className='flex items-center gap-1 text-green-500'>
                            <Check size={15} />
                            {t('copied')}
                        </div>
                    ) : (
                        t('copy')
                    )}
                </div>
            </TooltipContent>
        </Tooltip>
    );
}

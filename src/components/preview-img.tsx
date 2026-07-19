import { dialogService } from '@src/services/dialog/service';
import { X } from 'lucide-react';
import AppImage from './app-image';

type IProps = {
    dialogId: string;
    path: string;
};

export default function PreviewImg({ dialogId, path }: IProps) {
    const onClose = () => {
        dialogService.closeById(dialogId);
    };

    return (
        <>
            <div className='flex items-center justify-center'>
                <AppImage
                    path={path}
                    sizes='100vw'
                    className='max-w-[100vw] max-h-[95dvh] size-full object-contain'
                />
            </div>

            <div
                onClick={onClose}
                className='absolute hover:cursor-pointer top-4 right-4 text-white'
            >
                <X size={32} />
            </div>
        </>
    );
}

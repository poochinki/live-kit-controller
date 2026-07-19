import IOSLoadingIcon from '@src/components/ios-loading';
// import { API_CONFIGS } from '@src/configs/api/env';
// import uploadFile from '@src/configs/api/upload-file';
import { dialogService } from '@src/services/dialog/service';
import type { Editor } from '@tiptap/react';
import { ImagePlus } from 'lucide-react';
import { useState } from 'react';

type IProps = {
    editor: Editor | null;
};

export default function EditorUpload({ editor }: IProps) {
    const [loading, setLoading] = useState(false);

    const onUploadImage = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];
            if (
                file?.type !== 'image/png' &&
                file?.type !== 'image/jpg' &&
                file?.type !== 'image/jpeg'
            ) {
                dialogService.error({
                    description: 'Only accept png, jpg, jpeg image file!',
                });
                return;
            }

            if (!file || !editor) return;

            try {
                setLoading(true);
                const formData = new FormData();
                formData.append('form-data', file);

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const res = {} as any;

                if (!!res?.data?.data?.length) {
                    const path = res?.data?.data?.[0]?.path;

                    if (!path) {
                        dialogService.error({
                            description: res?.data?.data?.[0]?.message,
                        });
                        return;
                    }

                    const fullPath = `${''}/${path}`;
                    editor.chain().focus().setImage({ src: fullPath }).run();
                }
            } catch (err) {
                console.error('Upload failed', err);
                dialogService.error({
                    description: 'Failed to upload image!',
                });
            } finally {
                setLoading(false);
            }
        };
    };

    return (
        <button
            type='button'
            onClick={onUploadImage}
            disabled={loading}
            className='text-xs flex items-center bg-gray-100 dark:border-[#343B4F] p-1.5 hover:cursor-pointer lg:hover:opacity-60 py-0.5 rounded gap-1 font-medium'
        >
            {loading ? (
                <IOSLoadingIcon color='pink' />
            ) : (
                <ImagePlus size={16} className='text-pink-500' />
            )}
            <p className='dark:text-black'>
                {' '}
                {loading ? 'Uploading...' : 'Add'}
            </p>
        </button>
    );
}

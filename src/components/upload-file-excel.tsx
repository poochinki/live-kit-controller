import { Download, FileCheckCorner, FilePlusCorner } from 'lucide-react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { RefObject, useImperativeHandle } from 'react';

export type UploadFileExcelRefHandler = {
    getFile: () => FileWithPath;
};

type IProps = {
    templateHref: string;
    ref: RefObject<UploadFileExcelRefHandler | null>;
};
export default function UploadFileExcel({ ref, templateHref }: IProps) {
    const t = useTranslations('upload-file-excel');

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
        useDropzone({
            multiple: false,
            accept: {
                'application/vnd.ms-excel': ['.xls'],
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                    ['.xlsx', '.xlsm'],
            },
        });

    const file = acceptedFiles?.[0];

    useImperativeHandle(ref, () => ({
        getFile() {
            return file;
        },
    }));

    return (
        <>
            <div className='border border-dashed border-gray-300 rounded-[10px] bg-gray-100 flex items-center justify-center min-h-30'>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className='flex gap-7'>
                        {!!file ? (
                            <FileCheckCorner
                                size={36}
                                className='text-primary mt-1'
                            />
                        ) : (
                            <FilePlusCorner
                                size={36}
                                className='text-primary'
                            />
                        )}
                        {isDragActive ? (
                            <p className='text-[13px] text-blue-500 '>
                                {t('dropping')}
                            </p>
                        ) : !!file ? (
                            <div className='flex flex-col gap-2'>
                                <p className='font-semibold text-primary'>
                                    {t('file-already')}
                                </p>

                                <div className='flex items-center bg-white border-md p-2 rounded-md gap-3 flex-wrap border border-primary'>
                                    <p className=' flex-1 line-clamp-1'>
                                        {' '}
                                        {file?.name}
                                    </p>
                                    <Button className='h-8 bg-blue-500 rounded-md'>
                                        {t('choose-diff')}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <p className='text-[13px] flex flex-col items-center'>
                                <span className='text-gray-600'>
                                    {t('drop')}
                                </span>
                                <span className='text-primary font-medium hover:cursor-pointer lg:hover:underline'>
                                    {t('click')}
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Link passHref href={templateHref}>
                <div className='text-primary hover:cursor-pointer lg:hover:underline flex items-center justify-center gap-2 mt-6 font-medium'>
                    <Download size={16} />
                    <p>{t('down')}</p>
                </div>
            </Link>
        </>
    );
}

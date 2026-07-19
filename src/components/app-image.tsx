'use client';

import { cn } from '@src/lib/utils';
import { dialogService } from '@src/services/dialog/service';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import PreviewImg from './preview-img';

const FALLBACK = '/icons/common/empty-img.png';

type IProps = {
    className?: string;
    path: string;
    isPreview?: boolean;
    removeLoader?: boolean;
} & Omit<ImageProps, 'src' | 'alt'>;

export default function AppImage({
    className = 'size-4',
    path,
    isPreview = false,
    loader = imgLoader,
    removeLoader = false,
    ...props
}: IProps) {
    const [src, setSrc] = useState(() => path?.trim() || FALLBACK);

    const onPreview = () => {
        if (!isPreview || src === FALLBACK) return;
        dialogService.open((id) => ({
            showCloseButton: false,
            className:
                'max-w-none size-full max-h-none overflow-hidden bg-transparent rounded-none border-none',
            content: <PreviewImg dialogId={id} path={src} />,
        }));
    };

    return (
        <Image
            {...props}
            width={0}
            height={0}
            className={cn(
                isPreview ? 'hover:cursor-pointer lg:hover:opacity-75' : '',
                className,
            )}
            sizes={
                props?.sizes ??
                '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            }
            alt='icon'
            src={src}
            loader={
                removeLoader ? undefined : src === FALLBACK ? undefined : loader
            }
            onClick={onPreview}
            onError={() => {
                if (src !== FALLBACK) {
                    setSrc(FALLBACK);
                }
            }}
        />
    );
}

function imgLoader({
    src,
    width,
    quality = 75,
}: {
    src: string;
    width: number;
    quality?: number;
}) {
    const local = ['img', 'icons'].some((s) => src.includes(s));
    return local
        ? src
        : `${process.env.NEXT_PUBLIC_API_UPLOAD}/${src}?w=${width}&q=${quality}`;
}

'use client';

import { Button } from '@src/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@src/components/ui/dialog';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useRef, useState, WheelEvent } from 'react';
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    type Crop,
    type PixelCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.05;

type IProps = {
    open: boolean;
    onClose: () => void;
    imageSrc: string;
    aspect?: number;
    onCropComplete: (blob: Blob) => void;
};

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
): Crop {
    return centerCrop(
        makeAspectCrop(
            { unit: '%', width: 90 },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    );
}

export default function ImageCropDialog({
    open,
    onClose,
    imageSrc,
    aspect,
    onCropComplete,
}: IProps) {
    const t = useTranslations('image-crop-dialog');

    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [zoom, setZoom] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    const onImageLoad = useCallback(
        (e: React.SyntheticEvent<HTMLImageElement>) => {
            const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
            setCrop(
                aspect
                    ? centerAspectCrop(w, h, aspect)
                    : ({
                          unit: '%',
                          x: 5,
                          y: 5,
                          width: 90,
                          height: 90,
                      } satisfies Crop),
            );
        },
        [aspect],
    );

    /** Ctrl/pinch wheel → zoom */
    const onWheel = (e: WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        setZoom((prev) =>
            Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev - e.deltaY * 0.001)),
        );
    };

    /**
     * Export the cropped region to a Blob.
     *
     * ReactCrop reports pixel coords relative to the *rendered* image element
     * (after CSS transform). Because we apply `scale(zoom)` via CSS, the
     * rendered element size stays the same but the image appears zoomed.
     *
     * The true pixel coords on the natural image are:
     *   naturalX = (cropX_rendered / zoom) * scaleX
     * where scaleX = naturalWidth / renderedWidth (without zoom).
     */
    const getCroppedBlob = useCallback((): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const image = imgRef.current;
            if (!image || !completedCrop) {
                reject(new Error('No image or crop data'));
                return;
            }

            // scaleX/Y: maps rendered-element px (at zoom=1) → natural px
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;

            // Crop coords come from the zoomed render → divide by zoom to get
            // coords relative to the unzoomed rendered element, then multiply
            // by scale to get natural image coords.
            const naturalX = (completedCrop.x / zoom) * scaleX;
            const naturalY = (completedCrop.y / zoom) * scaleY;
            const naturalW = (completedCrop.width / zoom) * scaleX;
            const naturalH = (completedCrop.height / zoom) * scaleY;

            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.floor(naturalW));
            canvas.height = Math.max(1, Math.floor(naturalH));

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Could not get canvas context'));
                return;
            }

            ctx.drawImage(
                image,
                naturalX,
                naturalY,
                naturalW,
                naturalH,
                0,
                0,
                canvas.width,
                canvas.height,
            );

            canvas.toBlob(
                (blob) => {
                    if (blob) resolve(blob);
                    else reject(new Error('Canvas toBlob returned null'));
                },
                'image/jpeg',
                0.95,
            );
        });
    }, [completedCrop, zoom]);

    const handleConfirm = async () => {
        try {
            setIsProcessing(true);
            const blob = await getCroppedBlob();
            onCropComplete(blob);
            onClose();
        } catch (err) {
            console.error('Crop error:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleClose = () => {
        setZoom(1);
        setCrop(undefined);
        setCompletedCrop(undefined);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
            <DialogContent className='max-w-175 w-full'>
                <DialogHeader>
                    <DialogTitle>{t('title')}</DialogTitle>
                </DialogHeader>

                {/* ── Crop area ── */}
                <div
                    ref={containerRef}
                    onWheel={onWheel}
                    className='flex items-center justify-center overflow-hidden max-h-[55vh] bg-muted rounded-md'
                    style={{ touchAction: 'none' }}
                >
                    <ReactCrop
                        crop={crop}
                        onChange={(_, pct) => setCrop(pct)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                        minWidth={40}
                        minHeight={40}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            ref={imgRef}
                            src={imageSrc}
                            alt='crop-preview'
                            onLoad={onImageLoad}
                            style={{
                                transform: `scale(${zoom})`,
                                transformOrigin: 'center',
                                // Keep rendered size stable so ReactCrop layout is correct
                                maxHeight: '55vh',
                                maxWidth: '100%',
                                objectFit: 'contain',
                                display: 'block',
                            }}
                        />
                    </ReactCrop>
                </div>

                {/* ── Zoom slider ── */}
                <div className='flex items-center gap-3 px-1'>
                    <button
                        type='button'
                        onClick={() =>
                            setZoom((z) =>
                                Math.max(
                                    MIN_ZOOM,
                                    +(z - ZOOM_STEP * 4).toFixed(2),
                                ),
                            )
                        }
                        className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                        <ZoomOut size={18} />
                    </button>

                    <input
                        type='range'
                        min={MIN_ZOOM}
                        max={MAX_ZOOM}
                        step={ZOOM_STEP}
                        value={isNaN(zoom) ? 1 : zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className='flex-1 accent-primary cursor-pointer'
                    />

                    <button
                        type='button'
                        onClick={() =>
                            setZoom((z) =>
                                Math.min(
                                    MAX_ZOOM,
                                    +(z + ZOOM_STEP * 4).toFixed(2),
                                ),
                            )
                        }
                        className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                        <ZoomIn size={18} />
                    </button>

                    <span className='text-xs text-muted-foreground w-10 text-right tabular-nums'>
                        {Math.round(zoom * 100)}%
                    </span>
                </div>

                <div className='gap-2 mt-10 flex justify-end items-center'>
                    <Button
                        variant='cancel'
                        onClick={handleClose}
                        disabled={isProcessing}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!completedCrop || isProcessing}
                    >
                        {isProcessing ? t('processing') : t('confirm')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

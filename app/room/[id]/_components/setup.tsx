import { useEffect, useRef, useState } from 'react';
import { LiveDevice } from '../type';
import { Button } from '@src/components/ui/button';

type IProps = {
    onGoLive: (device: LiveDevice) => void;
};

export default function LivestreamSetup({ onGoLive }: IProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
    const [mics, setMics] = useState<MediaDeviceInfo[]>([]);
    const [cameraId, setCameraId] = useState<string>('');
    const [micId, setMicId] = useState<string>('');
    const [camOn, setCamOn] = useState<boolean>(true);
    const [micOn, setMicOn] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const refreshDevices = async () => {
        const list = await navigator.mediaDevices.enumerateDevices();
        setCameras(list.filter((d) => d.kind === 'videoinput'));
        setMics(list.filter((d) => d.kind === 'audioinput'));
    };

    const stopStream = () => {
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
    };

    const startPreview = async () => {
        setError('');
        stopStream();
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: camOn
                    ? cameraId
                        ? { deviceId: { exact: cameraId } }
                        : true
                    : false,
                audio: micOn
                    ? micId
                        ? { deviceId: { exact: micId } }
                        : true
                    : false,
            });
            streamRef.current = stream;
            if (videoRef.current) videoRef.current.srcObject = stream;
            await refreshDevices();
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            setError('Không truy cập được camera/mic: ' + message);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        startPreview();
        return () => stopStream();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cameraId, micId, camOn, micOn]);

    const canGoLive = !error && (camOn || micOn);

    const handleGoLive = () => {
        if (!canGoLive) return;
        stopStream();
        onGoLive({ cameraId, micId });
    };

    return (
        <div className='min-h-screen bg-[#0a0b0d] text-[#e9ebee] px-5 py-8 md:px-14 flex flex-col gap-7'>
            <section className='flex flex-col gap-4'>
                <div className='w-full flex justify-center items-center rounded-md'>
                    <div className='relative w-full max-w-[960px] aspect-video mx-auto bg-black border border-[#292d33] rounded overflow-hidden'>
                        {camOn ? (
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className='w-full h-full object-cover -scale-x-100'
                            />
                        ) : (
                            <div className='w-full h-full flex items-center justify-center text-[#868d97] font-mono text-[13px] tracking-[0.15em] bg-[repeating-linear-gradient(135deg,#111318,#111318_12px,#0d0f13_12px,#0d0f13_24px)]'>
                                CAMERA OFF
                            </div>
                        )}

                        <div className='absolute top-2 left-2 w-[18px] h-[18px] border-t-2 border-l-2 border-white/35' />
                        <div className='absolute top-2 right-2 w-[18px] h-[18px] border-t-2 border-r-2 border-white/35' />
                        <div className='absolute bottom-2 left-2 w-[18px] h-[18px] border-b-2 border-l-2 border-white/35' />
                        <div className='absolute bottom-2 right-2 w-[18px] h-[18px] border-b-2 border-r-2 border-white/35' />

                        <div className='absolute bottom-2.5 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.1em] text-[#868d97] bg-black/70 px-2.5 py-[3px] rounded'>
                            PREVIEW · 16:9
                        </div>
                    </div>
                </div>

                <div className='flex gap-2.5 justify-center'>
                    <button
                        type='button'
                        onClick={() => setCamOn((v) => !v)}
                        className={`font-mono text-xs tracking-[0.04em] px-4 py-2.5 rounded border transition-colors ${
                            camOn
                                ? 'border-[#34e3bd] text-[#34e3bd] bg-[#15171b]'
                                : 'border-[#5c1a1a] text-[#ff3b3b] bg-[#15171b]'
                        }`}
                    >
                        {camOn ? 'Camera: On' : 'Camera: Off'}
                    </button>
                    <button
                        type='button'
                        onClick={() => setMicOn((v) => !v)}
                        className={`font-mono text-xs tracking-[0.04em] px-4 py-2.5 rounded border transition-colors ${
                            micOn
                                ? 'border-[#34e3bd] text-[#34e3bd] bg-[#15171b]'
                                : 'border-[#5c1a1a] text-[#ff3b3b] bg-[#15171b]'
                        }`}
                    >
                        {micOn ? 'Mic: On' : 'Mic: Off'}
                    </button>
                </div>

                <div className='flex flex-wrap gap-4 justify-center'>
                    <label className='flex flex-col gap-1.5 text-xs text-[#868d97] min-w-[220px]'>
                        <span>Camera</span>
                        <select
                            value={cameraId}
                            onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>,
                            ) => setCameraId(e.target.value)}
                            className='bg-[#15171b] border border-[#292d33] text-[#e9ebee] text-sm px-2.5 py-2 rounded'
                        >
                            <option value=''>Default system</option>
                            {cameras.map((d) => (
                                <option key={d.deviceId} value={d.deviceId}>
                                    {d.label ||
                                        `Camera ${d.deviceId.slice(0, 6)}`}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className='flex flex-col gap-1.5 text-xs text-[#868d97] min-w-[220px]'>
                        <span>Micro</span>
                        <select
                            value={micId}
                            onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>,
                            ) => setMicId(e.target.value)}
                            className='bg-[#15171b] border border-[#292d33] text-[#e9ebee] text-sm px-2.5 py-2 rounded'
                        >
                            <option value=''>Default system</option>
                            {mics.map((d) => (
                                <option key={d.deviceId} value={d.deviceId}>
                                    {d.label || `Mic ${d.deviceId.slice(0, 6)}`}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                {error && (
                    <p className='text-center text-[#ff3b3b] text-[13px]'>
                        {error}
                    </p>
                )}
            </section>

            <div className='grid place-items-center'>
                <Button
                    type='button'
                    disabled={!canGoLive}
                    onClick={handleGoLive}
                    className={`mt-auto px-5 py-3.5 rounded-md font-semibold text-sm tracking-[0.02em] transition-[filter] w-fit ${
                        canGoLive
                            ? 'bg-[#ff3b3b] text-white hover:brightness-110'
                            : 'bg-[#1c1f24] text-[#868d97] cursor-not-allowed'
                    }`}
                >
                    Start live
                </Button>
            </div>
        </div>
    );
}

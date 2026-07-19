import type { TrackReferenceOrPlaceholder } from '@livekit/components-react';
import {
    useLocalParticipant,
    useRoomContext,
    useTracks,
    VideoTrack,
} from '@livekit/components-react';
import { Button } from '@src/components/ui/button';
import { Track } from 'livekit-client';
import { useEffect, useState } from 'react';

type IProps = {
    onLeave?: () => void;
};

export default function LivestreamStage({ onLeave }: IProps) {
    const room = useRoomContext();
    const { localParticipant, isCameraEnabled, isMicrophoneEnabled } =
        useLocalParticipant();
    const trackRefs = useTracks([Track.Source.Camera]);
    const localCamRef: TrackReferenceOrPlaceholder | undefined = trackRefs.find(
        (t) => t.participant.isLocal,
    );
    const timecode = useElapsedTime(true);

    const toggleCamera = () =>
        localParticipant.setCameraEnabled(!isCameraEnabled);
    const toggleMic = () =>
        localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
    const leaveStage = () => {
        room.disconnect();
        onLeave?.();
    };

    const toggleBtnClass = (on: boolean): string =>
        `font-mono text-xs tracking-[0.04em] px-4 py-2.5 rounded border transition-colors ${
            on
                ? 'border-[#34e3bd] text-[#34e3bd] bg-[#15171b]'
                : 'border-[#5c1a1a] text-[#ff3b3b] bg-[#15171b]'
        }`;

    return (
        <div className='min-h-screen flex flex-col bg-[#0a0b0d] text-[#e9ebee]'>
            {/* topbar */}
            <header className='flex items-center gap-4 px-5 md:px-10 py-4 border-b border-[#292d33]'>
                <div className='flex items-center gap-2 font-mono text-xs font-bold tracking-[0.12em] text-[#ff3b3b]'>
                    <span className='w-2.5 h-2.5 rounded-full bg-[#ff3b3b] shadow-[0_0_0_4px_rgba(255,59,59,0.18)] animate-pulse' />
                    ON AIR
                </div>
                <span className='text-[13px] text-[#868d97] flex-1'>
                    {room.name || 'Room unname'}
                </span>
                <span className='font-mono text-[13px] tracking-[0.05em]'>
                    {timecode}
                </span>
            </header>

            {/* centered 16:9 stage */}
            <div className='flex-1 flex items-center justify-center p-4 md:p-10'>
                <div className='w-full h-full flex items-center justify-center'>
                    <div
                        className='relative aspect-video bg-black border border-[#292d33] rounded overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.4),0_24px_60px_rgba(0,0,0,0.5)]'
                        style={{
                            width: 'min(100%, calc((100vh - 220px) * 16 / 9))',
                        }}
                    >
                        {localCamRef ? (
                            <VideoTrack
                                trackRef={localCamRef}
                                className='w-full h-full object-cover'
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
                    </div>
                </div>
            </div>

            {/* controls */}
            <footer className='flex gap-3 justify-center p-[18px] border-t border-[#292d33]'>
                <button
                    type='button'
                    onClick={toggleCamera}
                    className={toggleBtnClass(isCameraEnabled)}
                >
                    {isCameraEnabled ? 'Camera: On' : 'Camera: Off'}
                </button>
                <button
                    type='button'
                    onClick={toggleMic}
                    className={toggleBtnClass(isMicrophoneEnabled)}
                >
                    {isMicrophoneEnabled ? 'Mic: On' : 'Mic: Off'}
                </button>
                <Button
                    type='button'
                    onClick={leaveStage}
                    className='font-mono text-xs tracking-[0.04em] px-[18px] py-2.5 rounded border border-[#ff3b3b] text-[#ff3b3b] bg-transparent hover:bg-[#ff3b3b] hover:text-white transition-colors'
                >
                    End live
                </Button>
            </footer>
        </div>
    );
}

function useElapsedTime(active: boolean): string {
    const [seconds, setSeconds] = useState<number>(0);
    useEffect(() => {
        if (!active) return undefined;
        const id = setInterval(() => setSeconds((s) => s + 1), 1000);
        return () => clearInterval(id);
    }, [active]);
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    return `${mm}:${ss}`;
}

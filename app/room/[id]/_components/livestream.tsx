import { LiveKitRoom } from '@livekit/components-react';
import { useCallback, useState } from 'react';
import { LiveDevice } from '../type';
import LivestreamSetup from './setup';
import LivestreamStage from './stage';

type IProps = {
    token: string;
};

const LIVE_SERVER = 'wss://cocos-yt9r3slt.livekit.cloud';

export default function Livestream({ token }: IProps) {
    const [phase, setPhase] = useState<'setup' | 'live'>('setup');
    const [devices, setDevices] = useState<LiveDevice>({
        cameraId: undefined,
        micId: undefined,
    });

    const handleGoLive = useCallback((deviceChoice: LiveDevice) => {
        setDevices(deviceChoice);
        setPhase('live');
    }, []);

    const handleLeave = useCallback(() => {
        setPhase('setup');
    }, []);

    if (phase === 'live') {
        return (
            <LiveKitRoom
                serverUrl={LIVE_SERVER}
                token={token}
                connect
                video={{ deviceId: devices.cameraId }}
                audio={{ deviceId: devices.micId }}
                onDisconnected={handleLeave}
                data-lk-theme='default'
            >
                <LivestreamStage onLeave={handleLeave} />
            </LiveKitRoom>
        );
    }

    return <LivestreamSetup onGoLive={handleGoLive} />;
}

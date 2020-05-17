import React from 'react';
import {ControlBar, CurrentTimeDisplay, Player, ReplayControl, TimeDivider, VolumeMenuButton} from 'video-react';

type Props = {
    src: string;
    poster: string;
}

const VideoPlayer = (props: Props) => {
    return (
        <div className={'video'}>
            <Player
                playInLine
                src={'videos/test_169.mp4'}
                poster={'images/video-poster.png'}
            >
                <ControlBar>
                    <ReplayControl seconds={10} order={1.1}/>
                    <ReplayControl seconds={30} order={1.2}/>
                    <CurrentTimeDisplay order={4.1}/>
                    <TimeDivider order={4.2}/>
                    <VolumeMenuButton disabled/>
                </ControlBar>
            </Player>
        </div>
    );
};

export default VideoPlayer;
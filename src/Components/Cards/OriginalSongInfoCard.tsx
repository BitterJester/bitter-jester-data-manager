import React from 'react';
import {Title} from "../Title";
import {Card} from "reactstrap";
import {OriginalSongs} from "../../Pages/OriginalSongCompetition";
import ReactAudioPlayer from 'react-audio-player';
import {ControlBar, CurrentTimeDisplay, Player, ReplayControl, TimeDivider, VolumeMenuButton} from 'video-react';

type Props = {
    originalSongs: OriginalSongs;
    updateSelectedSong: Function;
    selectedIndex: number;
}

const OriginalSongInfoCard = (props: Props) => {
    const {originalSongs, updateSelectedSong, selectedIndex} = props;
    const unwrappedOriginalSongs = originalSongs.originalSongs;
    const hasSongs = unwrappedOriginalSongs.length;
    const originalSong = unwrappedOriginalSongs[selectedIndex];
    const songDescription = hasSongs ? originalSong.songDescription : '';
    const songUrl = hasSongs ? originalSong.songUrl : '';

    const updateSongIndex = (plusOrMinusOne: 1 | -1) => {
        const newSongIndex = selectedIndex + plusOrMinusOne;
        const maximumSongIndex = unwrappedOriginalSongs.length - 1;

        if (newSongIndex > maximumSongIndex) {
            updateSelectedSong(0);
        } else if (newSongIndex < 0) {
            updateSelectedSong(maximumSongIndex);
        } else {
            updateSelectedSong(newSongIndex);
        }
    };
    return (
        <Card className={'original-song-info-card'}>
            <Title titleDisplayText={'SONG INFO'}/>
            <div className={'original-song-info-container'}>
                <div className={'original-song-selection-button-container'}>
                    <button className={'original-song-selection-button'}
                            onClick={() => updateSongIndex(-1)}>{'<'}</button>
                </div>
                <div className={'original-song-info-content'}>
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
                    <div className={'audio-player'}>
                        <ReactAudioPlayer src={songUrl} controls/>
                    </div>
                    <div className={'song-description'}>
                        <h5>SONG DESCRIPTION</h5>
                        <p>
                            {songDescription}
                        </p>
                    </div>
                </div>
                <div className={'original-song-selection-button-container'}>
                    <button className={'original-song-selection-button'}
                            onClick={() => updateSongIndex(1)}>{'>'}</button>
                </div>
            </div>
        </Card>
    );
};

export default OriginalSongInfoCard;
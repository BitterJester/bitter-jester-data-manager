import React, {useState} from 'react';
import {Title} from "../Title";
import {Card, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {OriginalSongs} from "../../Pages/OriginalSongCompetition";
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
    const songName = hasSongs ? originalSong.songName : '';
    const bandName = hasSongs ? originalSong.bandName : '';

    const updateSongIndex = (event) => {
        const selectedBandName = event.target.innerText.split(' - ')[1];
        const newIndex = originalSongs.originalSongs.findIndex(song => {
            return song.bandName === selectedBandName;
        });

        updateSelectedSong(newIndex);
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const formattedTitle = `${songName} - ${bandName}`;
    return (
        <Card className={'original-song-info-card'}>
            <Title titleDisplayText={'SONG INFO'}/>
            <div className={'band-selection-dropdown'}>
                <Dropdown className={'scheduleDropdownContainer'} isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle className={'toggle'} caret>
                        Songs
                    </DropdownToggle>
                    <DropdownMenu>
                        {
                            originalSongs.originalSongs.map(song => {
                                return (
                                    <DropdownItem onClick={updateSongIndex}>
                                        {`${song.songName} - ${song.bandName}`}
                                    </DropdownItem>
                                );
                            })
                        }
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className={'original-song-info-container'}>
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
                    <div className={'subtitle'}>
                        <h3>{formattedTitle}</h3>
                    </div>
                    <div className={'song-description'}>
                        <h5>SONG DESCRIPTION</h5>
                        <p>
                            {songDescription}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default OriginalSongInfoCard;
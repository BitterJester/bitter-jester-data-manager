import React, {useState} from 'react';
import {Title} from "../Title";
import {Card} from "reactstrap";
import {OriginalSongs} from "../../Pages/OriginalSongCompetition";
import BandSelectionDropDown from "../BandSelectionDropDown";
import VideoPlayer from "../VideoPlayer";

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
            <BandSelectionDropDown
                originalSongs={originalSongs}
                dropdownOpen={dropdownOpen}
                toggle={toggle}
                updateSongIndex={updateSongIndex}
            />
            <div className={'original-song-info-container'}>
                <div className={'original-song-info-content'}>
                    <VideoPlayer src={'videos/test_169.mp4'} poster={'images/video-poster.png'}/>
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
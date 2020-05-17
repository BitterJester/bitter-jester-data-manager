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
        const selectedBandName = event.target.innerText;
        const newIndex = originalSongs.originalSongs.findIndex(song => {
            return selectedBandName.includes(song.bandName) && selectedBandName.includes(song.songName);
        });

        updateSelectedSong(newIndex);
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const formattedTitle = `"${songName}" by ${bandName}`;
    return (
        <Card className={'original-song-info-card'}>
            <Title titleDisplayText={'SONG INFO'}/>
            <BandSelectionDropDown
                originalSongs={originalSongs}
                dropdownOpen={dropdownOpen}
                toggle={toggle}
                updateSongIndex={updateSongIndex}
                selected={originalSong}
            />
            <div className={'original-song-info-container'}>
                <div className={'original-song-info-content'}>
                    <VideoPlayer
                        src={'https://www.jotform.com/uploads/BitterJester/201218940610142/4655632049115241457/MP4%20TEST%20v4.0_FB-720_VBR-2_10-12MBs_1920-1080.mp4'}
                        poster={'images/video-poster.png'}/>
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
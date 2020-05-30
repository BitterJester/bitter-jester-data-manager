import React, {useState} from 'react';
import {Title} from "../Title";
import {Card} from "reactstrap";
import {OriginalSongs} from "../../Pages/OriginalSongCompetition";
import BandSelectionDropDown from "../BandSelectionDropDown";

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
    const vimeoId = hasSongs ? originalSong.vimeoId : '';

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
                    <div>
                        <iframe src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
                                width="640"
                                height="360" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen/>
                    </div>
                    <div className={'subtitle'}>
                        <h3>{formattedTitle}</h3>
                    </div>
                    <div className={'song-description'}>
                        <h5>SONG DESCRIPTION</h5>
                        <p style={{whiteSpace: "pre-wrap"}}>
                            {songDescription}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default OriginalSongInfoCard;
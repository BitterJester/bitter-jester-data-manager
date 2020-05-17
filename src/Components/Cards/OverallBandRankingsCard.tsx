import React, {useState} from 'react';
import {Card, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import {Title} from "../Title";
import {OriginalSong, OriginalSongs} from "../../Pages/OriginalSongCompetition";

type Props = {
    originalSongs: OriginalSongs;
}

type SongRanking = {
    firstPlace: {
        songName: string;
        bandName: string;
    }
}

const OverallBandRankingsCard = (props: Props) => {
    const {originalSongs} = props;
    const [isOpen, setIsOpen] = useState(false);
    const [songRankings, setSongRankings] = useState({} as SongRanking);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const updateSongRankings = (song: OriginalSong) => {
        setSongRankings(
            {
                ...songRankings,
                firstPlace: {songName: song.songName, bandName: song.bandName}
            }
        );
    };

    return (
        <Card className={'overall-band-rankings-card'}>
            <Title titleDisplayText={'OVERALL SONG RANKINGS'}/>
            <div className={'ranking-dropdown-container'}>
                <h4 className={'ranking-title'}>
                    1st PLACE
                </h4>
                <Dropdown className={'ranking-dropdown'} isOpen={isOpen} toggle={toggle}>
                    <DropdownToggle className={'toggle'} caret>
                        {
                            songRankings.firstPlace ?
                                `"${songRankings.firstPlace.songName}" by ${songRankings.firstPlace.bandName}` :
                                'Please select your first place choice.'
                        }
                    </DropdownToggle>
                    <DropdownMenu>
                        {
                            originalSongs.originalSongs.map(song => {
                                return (
                                    <DropdownItem onClick={() => updateSongRankings(song)}>
                                        {`"${song.songName}" by ${song.bandName}`}
                                    </DropdownItem>
                                );
                            })
                        }
                    </DropdownMenu>
                </Dropdown>
            </div>
        </Card>
    );
};

export default OverallBandRankingsCard;
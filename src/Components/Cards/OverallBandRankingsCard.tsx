import React, {useState} from 'react';
import {Card} from 'reactstrap';
import {Title} from "../Title";
import {OriginalSong, OriginalSongs} from "../../Pages/OriginalSongCompetition";
import RankingDropdown from "../RankingDropdown";

type Props = {
    originalSongs: OriginalSongs;
}

export type SongRanking = {
    firstPlace?: {
        songName: string;
        bandName: string;
    },
    secondPlace?: {
        songName: string;
        bandName: string;
    },
    thirdPlace?: {
        songName: string;
        bandName: string;
    }
}

const OverallBandRankingsCard = (props: Props) => {
    const {originalSongs} = props;
    const [isFirstPlaceOpen, setIsFirstPlaceOpen] = useState(false);
    const [isSecondPlaceOpen, setIsSecondPlaceOpen] = useState(false);
    const [isThirdPlaceOpen, setIsThirdPlaceOpen] = useState(false);
    const [songRankings, setSongRankings] = useState({} as SongRanking);

    const toggleFirst = () => {
        setIsFirstPlaceOpen(!isFirstPlaceOpen);
    };

    const toggleSecond = () => {
        setIsSecondPlaceOpen(!isSecondPlaceOpen);
    };

    const toggleThird = () => {
        setIsThirdPlaceOpen(!isThirdPlaceOpen);
    };

    const updateSongRankings = (song: OriginalSong, placeToUpdate: keyof SongRanking) => {
        setSongRankings(
            {
                ...songRankings,
                [placeToUpdate]: {songName: song.songName, bandName: song.bandName}
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
                <RankingDropdown originalSongs={originalSongs}
                                 isOpen={isFirstPlaceOpen}
                                 toggle={toggleFirst}
                                 updateSongRankings={updateSongRankings}
                                 songRankings={songRankings}
                                 placeToUpdate={'firstPlace'}/>
            </div>
            <div className={'ranking-dropdown-container'}>
                <h4 className={'ranking-title'}>
                    2nd PLACE
                </h4>
                <RankingDropdown originalSongs={originalSongs}
                                 isOpen={isSecondPlaceOpen}
                                 toggle={toggleSecond}
                                 updateSongRankings={updateSongRankings}
                                 songRankings={songRankings}
                                 placeToUpdate={'secondPlace'}/>
            </div>
            <div className={'ranking-dropdown-container'}>
                <h4 className={'ranking-title'}>
                    3rd PLACE
                </h4>
                <RankingDropdown originalSongs={originalSongs}
                                 isOpen={isThirdPlaceOpen}
                                 toggle={toggleThird}
                                 updateSongRankings={updateSongRankings}
                                 songRankings={songRankings}
                                 placeToUpdate={'thirdPlace'}/>
            </div>
        </Card>
    );
};

export default OverallBandRankingsCard;
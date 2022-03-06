import React, {Fragment, useEffect, useState} from 'react';
import WeeklyRankingScoreBarChart from "./WeeklyRankingScoreBarChart";
import WeeklyJudgesCommentsContainer from "./WeeklyJudgesCommentsContainer";
import WeeklyRankingsHeader from "./WeeklyRankingsHeader";
import {JudgesInfo} from "../../pages/OriginalSongCompetition";
import {BitterJesterApiOriginalSongCompetitionRequest} from "../../utils/api-requests/bitter-jester-api-original-song-competition-request";

type SongRankingTotal = {
    songName: string;
    bandName: string;
    totalPoints: number;
}

export type SongRankingTotals = {
    allSongsAreSubmitted: boolean;
    totalFinalRankings: number;
    totalScores: SongRankingTotal[];
    judgesWhoHaveNotSubmittedAllRankings: JudgesInfo[]
};

type Props = {
    week: number;
    setWeek: Function;
}

function NoRankingsYet() {
    return <div>
        <h1>
            No Rankings Yet!
        </h1>
    </div>;
}

const WeeklyRankingScoreBarChartContainer = (props: Props) => {
    const {week, setWeek} = props;
    const initialSongRankingTotals: SongRankingTotals = {
        totalScores: [],
        totalFinalRankings: 0,
        allSongsAreSubmitted: false,
        judgesWhoHaveNotSubmittedAllRankings: []
    };
    const [songRankingTotals, setSongRankingTotals] = useState(initialSongRankingTotals);

    useEffect(() => {
        const fetch = async () => {
            const apiRequest = new BitterJesterApiOriginalSongCompetitionRequest();
            setSongRankingTotals(await apiRequest.getScoresForSongsInWeek());
        };

        fetch();
    }, [week]);

    return (
        <div className={'weekly-results-container'}>
            {
                songRankingTotals.totalFinalRankings ?
                (<Fragment>
                    <WeeklyRankingsHeader
                        week={week}
                        setWeek={setWeek}
                        songRankingTotals={songRankingTotals}/>
                    <WeeklyRankingScoreBarChart songRankingTotals={songRankingTotals}/>
                    <WeeklyJudgesCommentsContainer week={week}/>
                </Fragment>) :
                    (
                        <Fragment>
                            <NoRankingsYet />
                        </Fragment>
                    )
            }
        </div>
    );
};

export default WeeklyRankingScoreBarChartContainer;
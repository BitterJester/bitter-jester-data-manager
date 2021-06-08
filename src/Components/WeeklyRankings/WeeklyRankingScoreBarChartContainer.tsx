import React, {useEffect, useState, Fragment} from 'react';
import {S3Client} from "../../aws/s3Client";
import WeeklyRankingScoreBarChart from "./WeeklyRankingScoreBarChart";
import WeeklyJudgesCommentsContainer from "./WeeklyJudgesCommentsContainer";
import WeeklyRankingsHeader from "./WeeklyRankingsHeader";
import {JudgesInfo} from "../../pages/OriginalSongCompetition";
import {getFromS3} from "../../aws/getFromS3";

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
            await getFromS3(`week=${week}/song-ranking-totals.json`, (fetchedSongRankingTotals) => {
                fetchedSongRankingTotals.totalScores = fetchedSongRankingTotals.totalScores.sort((a, b) => a.totalPoints > b.totalPoints ? -1 : 1);
                setSongRankingTotals(fetchedSongRankingTotals);
            });
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
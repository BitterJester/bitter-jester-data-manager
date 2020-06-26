import React, {useEffect, useState} from 'react';
import {S3Client} from "../../aws/s3Client";
import WeeklyRankingScoreBarChart from "./WeeklyRankingScoreBarChart";
import WeeklyJudgesCommentsContainer from "./WeeklyJudgesCommentsContainer";
import WeeklyRankingsHeader from "./WeeklyRankingsHeader";
import {JudgesInfo} from "../../Pages/OriginalSongCompetition";

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
            const fetchedSongRankingTotals = await new S3Client().getObject(`week=${week}/song-ranking-totals.json`) as SongRankingTotals;
            fetchedSongRankingTotals.totalScores = fetchedSongRankingTotals.totalScores.sort((a, b) => a.totalPoints > b.totalPoints ? -1 : 1);
            setSongRankingTotals(fetchedSongRankingTotals);
        };

        fetch();
    }, [week]);

    return (
        <div className={'weekly-results-container'}>
            <WeeklyRankingsHeader
                week={week}
                setWeek={setWeek}
                songRankingTotals={songRankingTotals}/>
            <WeeklyRankingScoreBarChart songRankingTotals={songRankingTotals}/>
            <WeeklyJudgesCommentsContainer week={week}/>
        </div>
    );
};

export default WeeklyRankingScoreBarChartContainer;
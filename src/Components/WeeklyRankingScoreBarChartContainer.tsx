import React, {useEffect, useState} from 'react';
import {S3Client} from "../aws/s3Client";
import WeeklyRankingScoreBarChart from "./WeeklyRankingScoreBarChart";

type SongRankingTotal = {
    songName: string;
    bandName: string;
    totalPoints: number;
}

type SongRankingTotals = {
    totalScores: SongRankingTotal[];
};

const WeeklyRankingScoreBarChartContainer = () => {
    const initialSongRankingTotals: SongRankingTotals = {totalScores: []};
    const [songRankingTotals, setSongRankingTotals] = useState(initialSongRankingTotals);

    useEffect(() => {
        const fetch = async () => {
            const fetchedSongRankingTotals = await new S3Client().getObject('song-ranking-totals.json');
            setSongRankingTotals(fetchedSongRankingTotals as SongRankingTotals);
        };

        fetch();
    }, []);

    return (
        <div className={'original-song-competition-container'}>
            <WeeklyRankingScoreBarChart/>
        </div>
    );
};

export default WeeklyRankingScoreBarChartContainer;
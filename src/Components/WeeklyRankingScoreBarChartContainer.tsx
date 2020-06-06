import React, {useEffect, useState} from 'react';
import {S3Client} from "../aws/s3Client";
import WeeklyRankingScoreBarChart from "./WeeklyRankingScoreBarChart";

type SongRankingTotal = {
    songName: string;
    bandName: string;
    totalPoints: number;
}

export type SongRankingTotals = {
    allSongsAreSubmitted: boolean;
    totalFinalRankings: number;
    totalScores: SongRankingTotal[];
};

const WeeklyRankingScoreBarChartContainer = () => {
    const initialSongRankingTotals: SongRankingTotals = {
        totalScores: [],
        totalFinalRankings: 0,
        allSongsAreSubmitted: false
    };
    const [songRankingTotals, setSongRankingTotals] = useState(initialSongRankingTotals);

    useEffect(() => {
        const fetch = async () => {
            const fetchedSongRankingTotals = await new S3Client().getObject('song-ranking-totals.json') as SongRankingTotals;
            fetchedSongRankingTotals.totalScores = fetchedSongRankingTotals.totalScores.sort((a, b) => a.totalPoints > b.totalPoints ? -1 : 1);
            setSongRankingTotals(fetchedSongRankingTotals);
        };

        fetch();
    }, []);

    return (
        <div className={'original-song-competition-container'}>
            <div style={{textAlign: "center"}}>
                <p>
                    {`Total Final Rankings: ${songRankingTotals.totalFinalRankings}`}
                </p>
                {songRankingTotals.allSongsAreSubmitted &&
                <p>
                    {'All rankings have been submitted for this week.'}
                </p>
                }
            </div>
            <div>
                <WeeklyRankingScoreBarChart songRankingTotals={songRankingTotals}/>
            </div>
        </div>
    );
};

export default WeeklyRankingScoreBarChartContainer;
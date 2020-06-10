import React from 'react';
import {SongRankingTotals} from "./WeeklyRankingScoreBarChartContainer";

type Props = {
    songRankingTotals: SongRankingTotals;
}

const WeeklyRankingsHeader = (props: Props) => {
    const {songRankingTotals} = props;
    return (
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
    );
};

export default WeeklyRankingsHeader;
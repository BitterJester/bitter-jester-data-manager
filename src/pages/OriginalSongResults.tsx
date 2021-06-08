import React, {useState} from 'react';
import Page from "../Components/Page";
import WeeklyRankingScoreBarChartContainer from "../Components/WeeklyRankings/WeeklyRankingScoreBarChartContainer";

const OriginalSongResults = () => {
    const [week, setWeek] = useState(1);

    return (
        <Page>
            <WeeklyRankingScoreBarChartContainer setWeek={setWeek} week={week}/>
        </Page>
    );
};

export default OriginalSongResults;
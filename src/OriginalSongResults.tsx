import React from 'react';
import Page from "./Components/Page";
import WeeklyRankingScoreBarChartContainer from "./Components/WeeklyRankingScoreBarChartContainer";
import {Card} from "reactstrap";

const OriginalSongResults = () => {
    return (
        <Page>
            <Card>
                <WeeklyRankingScoreBarChartContainer/>
            </Card>
        </Page>
    );
};

export default OriginalSongResults;
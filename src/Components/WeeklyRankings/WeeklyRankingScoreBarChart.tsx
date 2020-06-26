import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";
import {SongRankingTotals} from "./WeeklyRankingScoreBarChartContainer";
import CardContainer from "../Cards/CardContainer";
import {Title} from "../Title";

type Props = {
    songRankingTotals: SongRankingTotals;
}

type BarChartOptions = {
    chart: {
        id: string;
    },
    xaxis: {
        categories: any[];
    }
}

type BarChartSeriesItem = {
    name: string;
    data: number[];
};

type BarChartData = {
    options: BarChartOptions;
    series: BarChartSeriesItem[];
}

const WeeklyRankingScoreBarChart = (props: Props) => {
    const {songRankingTotals} = props;

    useEffect(() => {
        const graphLabels = songRankingTotals.totalScores.map(score => `"${score.songName}" by ${score.bandName}`);
        const totalPointsArray = songRankingTotals.totalScores.map(score => score.totalPoints);
        const options: BarChartOptions = {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: graphLabels
            }
        };

        const series: BarChartSeriesItem[] = [
            {
                name: 'Total Points From Judges',
                data: totalPointsArray
            }
        ];

        const updatedChartData = {options, series};

        setChartData(updatedChartData)
    }, [songRankingTotals]);

    const [chartData, setChartData] = useState({} as BarChartData);

    return (
        <CardContainer className="weekly-ranking-bar-chart-container">
            <Title titleDisplayText={'SONG RANKINGS'}/>
            <div className="weekly-ranking-bar-chart">
                {chartData.series && <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={'500'}
                />}
            </div>
            <p>
                Judges Who Haven't Submitted Rankings
            </p>
            {
                songRankingTotals.judgesWhoHaveNotSubmittedAllRankings && songRankingTotals.judgesWhoHaveNotSubmittedAllRankings.map(judge => {
                    return (
                        <div>
                            <div>
                                {`${judge.emailAddress}`}
                            </div>
                        </div>
                    )
                })
            }
        </CardContainer>
    );
};

export default WeeklyRankingScoreBarChart;
import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";
import {SongRankingTotals} from "./WeeklyRankingScoreBarChartContainer";

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
        console.log(totalPointsArray);
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
                name: "series-1",
                data: totalPointsArray
            }
        ];

        const updatedChartData = {options, series};

        setChartData(updatedChartData)
    }, [songRankingTotals]);

    const [chartData, setChartData] = useState({} as BarChartData);

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    {chartData.series && <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="bar"
                        width="1000"
                    />}
                </div>
            </div>
        </div>
    );
};

export default WeeklyRankingScoreBarChart;
import React, {useEffect, useState} from 'react';
import {SongRankingTotals} from "./WeeklyRankingScoreBarChartContainer";
import {Alert, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

type Props = {
    songRankingTotals: SongRankingTotals;
    setWeek: Function;
    week: number;
}

const WeeklyRankingsHeader = (props: Props) => {
    const {songRankingTotals, setWeek, week} = props;

    const [dropdownState, setDropdownState] = useState({isOpen: false, title: ''});

    useEffect(() => {
        setDropdownState({...dropdownState, title: `Selected Week: ${week}`})
    }, [week]);

    return (
        <div style={{textAlign: "center"}}>
            <Alert isOpen={songRankingTotals.allSongsAreSubmitted} color={'success'}>
                {'All rankings have been submitted for this week.'}

            </Alert>
            <Dropdown isOpen={dropdownState.isOpen}
                      toggle={() => setDropdownState({...dropdownState, isOpen: !dropdownState.isOpen})}>
                <DropdownToggle caret>
                    {dropdownState.title}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => setWeek(1)}>
                        1
                    </DropdownItem>
                    <DropdownItem onClick={() => setWeek(2)}>
                        2
                    </DropdownItem>
                    <DropdownItem onClick={() => setWeek(3)}>
                        3
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <p>
                {`Total Final Rankings: ${songRankingTotals.totalFinalRankings}`}
            </p>
        </div>
    );
};

export default WeeklyRankingsHeader;
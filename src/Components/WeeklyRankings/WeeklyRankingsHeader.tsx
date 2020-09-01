import React, {useEffect, useState} from 'react';
import {SongRankingTotals} from "./WeeklyRankingScoreBarChartContainer";
import {Alert, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {POSSIBLE_WEEKS_OF_BATTLE} from "../../static/constants/weeks";

type Props = {
    songRankingTotals: SongRankingTotals;
    setWeek: Function;
    week: number;
}

const WeeklyRankingsHeader = (props: Props) => {
    const {songRankingTotals, setWeek, week} = props;

    const [dropdownState, setDropdownState] = useState({isOpen: false, title: ''});

    useEffect(() => {
        const weekInfo = POSSIBLE_WEEKS_OF_BATTLE.filter(weekOfBattle => weekOfBattle.weekCode === week)[0];
        setDropdownState({...dropdownState, title: `Selected Week: ${weekInfo.displayFriendlyWeek}`})
    }, [week]);

    return <div style={{textAlign: "center"}}>
        <Alert isOpen={songRankingTotals.allSongsAreSubmitted} color={'success'}>
            {'All rankings have been submitted for this week.'}
        </Alert>
        <Dropdown isOpen={dropdownState.isOpen}
                  toggle={() => setDropdownState({...dropdownState, isOpen: !dropdownState.isOpen})}>
            <DropdownToggle caret>
                {dropdownState.title}
            </DropdownToggle>
            <DropdownMenu>
                {
                    POSSIBLE_WEEKS_OF_BATTLE.map(weekOfBattle =>
                        <DropdownItem
                            onClick={() => setWeek(weekOfBattle.weekCode)}
                        >
                            {weekOfBattle.displayFriendlyWeek}
                        </DropdownItem>
                    )
                }
            </DropdownMenu>
        </Dropdown>
        <p>
            {`Total Final Rankings: ${songRankingTotals.totalFinalRankings}`}
        </p>
    </div>;
};

export default WeeklyRankingsHeader;
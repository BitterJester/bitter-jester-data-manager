import React, {useEffect, useState} from 'react';
import Page from "./Components/Page";
import WeeklyRankingScoreBarChartContainer from "./Components/WeeklyRankings/WeeklyRankingScoreBarChartContainer";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import CardContainer from "./Components/Cards/CardContainer";

const OriginalSongResults = () => {
    const [week, setWeek] = useState(1);
    const [dropdownState, setDropdownState] = useState({isOpen: false, title: ''});

    useEffect(() => {
        setDropdownState({...dropdownState, title: `Selected Week: ${week}`})
    }, [week]);

    return (
        <Page>
            <CardContainer>
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
                    </DropdownMenu>
                </Dropdown>
                <WeeklyRankingScoreBarChartContainer week={week}/>
            </CardContainer>
        </Page>
    );
};

export default OriginalSongResults;
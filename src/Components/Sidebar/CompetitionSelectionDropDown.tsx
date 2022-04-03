import React, {useEffect, useState} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {useSelector} from "react-redux";
import dataManagerReduxStore, {DataManagerReduxStore} from "../../redux/data-manager-redux-store";
import {BitterJesterApiCompetitionsRequest} from "../../utils/api-requests/bitter-jester-api-competitions-request";

export type CompetitionDropDownOption = {
    id: string;
    name: string;
}

const CompetitionSelectionDropDown = () => {
    const {isAdmin} = useSelector((state: DataManagerReduxStore) => state.signInUserSession);
    const fetch = async () => {
        const competitionsApiRequest = new BitterJesterApiCompetitionsRequest();
        const competitions = await competitionsApiRequest.getAllCompetitions();
        const filteredCompetitions = competitions.competitions.filter(comp => comp.type === 'online');
        return dataManagerReduxStore.dispatch({type: 'competitions/set', payload: {competitions: isAdmin ? competitions.competitions : filteredCompetitions}});
    }

    useEffect(() => {
        fetch();
    }, []);
    const {selectedCompetition, competitions} = useSelector((state: DataManagerReduxStore) => {
        return ({competitions: state.appInfo.competitions, selectedCompetition: state.selectedCompetition});
    });
    const [isOpen, updateIsOpen] = useState(false);

    return (
        <div className={'competition-selection-drop-down'}>
            <Dropdown toggle={() => updateIsOpen(!isOpen)} isOpen={isOpen} disabled={false}>
                <DropdownToggle disabled={false} className={'toggle'} caret>
                    {selectedCompetition && selectedCompetition.name !== '' ? selectedCompetition.name : 'Select Your Competition'}
                </DropdownToggle>
                <DropdownMenu>
                    {competitions.map(competition =>
                        <DropdownItem
                            onClick={() => {
                                const found = competitions.find(c => c.name === competition.name);
                                dataManagerReduxStore.dispatch({
                                    type: 'competition/set',
                                    payload: {selectedCompetition: {...competition, ...found}}
                                });
                            }}
                        >
                            {competition.name}
                        </DropdownItem>)}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default CompetitionSelectionDropDown;
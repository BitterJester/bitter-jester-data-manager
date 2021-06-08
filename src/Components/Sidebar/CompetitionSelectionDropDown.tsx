import React, { useState} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {useSelector} from "react-redux";
import dataManagerReduxStore, {DataManagerReduxStore} from "../../redux/data-manager-redux-store";

export type CompetitionDropDownOption = {
    id: string;
    name: string;
}

const CompetitionSelectionDropDown = () => {
    const {selectedCompetition, competitions} = useSelector((state: DataManagerReduxStore) => {
        return ({competitions: state.appInfo.competitions, selectedCompetition: state.selectedCompetition});
    });
    const [isOpen, updateIsOpen] = useState(false);
    return (
        <div className={'competition-selection-drop-down'}>
            <Dropdown toggle={() => updateIsOpen(!isOpen)} isOpen={isOpen} disabled={false}>
                <DropdownToggle disabled={false} className={'toggle'} caret>
                    {selectedCompetition && selectedCompetition.name !== ''  ? selectedCompetition.name : 'Select Your Competition'}
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
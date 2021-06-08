import React, { useState} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {useSelector} from "react-redux";
import {DataManagerReduxStore} from "../../redux/data-manager-redux-store";

export type CompetitionDropDownOption = {
    id: string;
    name: string;
}

interface Props {
    selectedCompetition: CompetitionDropDownOption;
    setSelectedCompetition: (selectedCompetition: CompetitionDropDownOption) => void;
}

const CompetitionSelectionDropDown = (props: Props) => {
    const competitions = useSelector((state: DataManagerReduxStore) => state.appInfo);
    const [isOpen, updateIsOpen] = useState(false);

    const {selectedCompetition} = props;

    return (
        <div className={'competition-selection-drop-down'}>
            <Dropdown toggle={() => updateIsOpen(!isOpen)} isOpen={isOpen} disabled={false}>
                <DropdownToggle disabled={false} className={'toggle'} caret>
                    {selectedCompetition.name !== '' ? selectedCompetition.name : 'Select Your Competition'}
                </DropdownToggle>
                <DropdownMenu>
                    {competitions.competitions.map(competition =>
                        <DropdownItem
                            onClick={() => props.setSelectedCompetition(competition)}>
                            {competition.name}
                        </DropdownItem>)}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default CompetitionSelectionDropDown;
import React, {useState} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

export type Competition = {
    id: string;
    name: string;
}

interface Props {
    selectedCompetition: Competition;
    setSelectedCompetition: (selectedCompetition: Competition) => void;
}

const CompetitionSelectionDropDown = (props: Props) => {
    const [competitions, updateCompetitions] = useState([{
        id: 'BJMF_Summer_2020',
        name: 'Bitter Jester Music Festival 2020'
    }]);

    const [isOpen, updateIsOpen] = useState(false);

    const {selectedCompetition} = props;

    return (
        <div className={'competition-selection-drop-down'}>
            <Dropdown toggle={() => updateIsOpen(!isOpen)} isOpen={isOpen} disabled={false}>
                <DropdownToggle disabled={false} className={'toggle'} caret>
                    {selectedCompetition.name !== '' ? selectedCompetition.name : 'Select Your Competition'}
                </DropdownToggle>
                <DropdownMenu>
                    {competitions.map(competition =>
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
import React, {useEffect, useState} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {getFromS3} from "../../aws/getFromS3";

export type CompetitionDropDownOption = {
    id: string;
    name: string;
}

interface Props {
    selectedCompetition: CompetitionDropDownOption;
    setSelectedCompetition: (selectedCompetition: CompetitionDropDownOption) => void;
}

const CompetitionSelectionDropDown = (props: Props) => {
    const [competitions, updateCompetitions] = useState([]);
    const [isOpen, updateIsOpen] = useState(false);

    const fetch = async () => {
        getFromS3('all-competitions.json', (competitions) => updateCompetitions(competitions.competitions), true);
    }

    useEffect(() => {
        fetch();
    }, []);

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
import React, {useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

interface Props extends RouteComponentProps {

}

const CompetitionSelectionDropDown = (props: Props) => {
    const [competitions, updateCompetitions] = useState([{
        id: 'BJMF_Summer_2020',
        name: 'Bitter Jester Music Festival 2020'
    }]);

    const [isOpen, updateIsOpen] = useState(false);

    const redirect = (path: string) => {
        props.history.push(path);
    };

    return (
        <Dropdown toggle={() => updateIsOpen(!isOpen)} isOpen={isOpen} disabled={false}>
            <DropdownToggle disabled={false} className={'toggle'} caret>
                Select Your Competition
            </DropdownToggle>
            <DropdownMenu>
                {competitions.map(competition =>
                    <DropdownItem
                        onClick={() => redirect(`/originalSong?competition=${competition.id}`)}>
                        {competition.name}
                    </DropdownItem>)}
            </DropdownMenu>
        </Dropdown>
    );
};

export default withRouter(CompetitionSelectionDropDown);
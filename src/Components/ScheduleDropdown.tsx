import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../static/scheduleDropdown.css';

type DropdownItemOnClick = {
    (event: React.MouseEvent<Element, MouseEvent>): void;
}

type Props = {
    dropdownItemOnClick:  DropdownItemOnClick;
    dropdownItemOnClick2: DropdownItemOnClick;
}

const ScheduleDropdown = (props: Props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { dropdownItemOnClick, dropdownItemOnClick2 } = props;
    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        <Dropdown className={'scheduleDropdownContainer'} isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                Switch Version
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={dropdownItemOnClick}>Suggested</DropdownItem>
                <DropdownItem onClick={dropdownItemOnClick2}>Last Saved</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default ScheduleDropdown;
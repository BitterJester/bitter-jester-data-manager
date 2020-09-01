import React, {useState} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import '../static/css/scheduleDropdown.css';

export type OnClickFunction = {
    (event: React.MouseEvent<Element, MouseEvent>): void;
}

type Props = {
    dropdownItemOnClick: OnClickFunction;
    dropdownItemOnClick2: OnClickFunction;
}

const SortIncompleteApplicationsDropdown = (props: Props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { dropdownItemOnClick, dropdownItemOnClick2 } = props;
    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        <Dropdown className={'scheduleDropdownContainer'} isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle className={'toggle'} caret>
                Sort By
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={dropdownItemOnClick}>Last Created</DropdownItem>
                <DropdownItem onClick={dropdownItemOnClick2}>Band Name</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default SortIncompleteApplicationsDropdown;
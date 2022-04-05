import React, {useEffect, useState} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {useSelector} from "react-redux";
import dataManagerReduxStore, {DataManagerReduxStore} from "../../redux/data-manager-redux-store";
import {BitterJesterApiCompetitionsRequest} from "../../utils/api-requests/bitter-jester-api-competitions-request";
import {UrlHelper} from "../../utils/url-helper";
import {withRouter} from "react-router";
import * as Url from "url";

const CompetitionSelectionDropDown = (props) => {
    const {isAdmin} = useSelector((state: DataManagerReduxStore) => state.signInUserSession);
    useEffect(() => {
        const fetch = async () => {
            const competitionsApiRequest = new BitterJesterApiCompetitionsRequest();
            const competitions = await competitionsApiRequest.getAllCompetitions();
            const queryparams = new URLSearchParams(window.location.search);
            if (queryparams.has('competition')) {
                // @ts-ignore
                const found = competitions.competitions.find(comp => comp.id === queryparams.get('competition'));
                dataManagerReduxStore.dispatch({
                    type: 'competition/set',
                    payload: {selectedCompetition: found},
                });
                if(window.location.pathname === '/') {
                    // @ts-ignore
                    new UrlHelper(props.history).redirectToCompletedSubmissions(found.id);
                }
            }
            const filteredCompetitions = competitions.competitions.filter(comp => comp.type === 'online');
            return dataManagerReduxStore.dispatch({
                type: 'competitions/set',
                payload: {competitions: isAdmin ? competitions.competitions : filteredCompetitions}
            });
        }
        fetch();
    }, [isAdmin]);
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
                    {competitions.map(competition => {
                        const onSelectedCompetitionChanged = () => {
                            const found = competitions.find(c => c.name === competition.name);
                            dataManagerReduxStore.dispatch({
                                type: 'competition/set',
                                payload: {selectedCompetition: {...competition, ...found}}
                            });
                            if (window.location.pathname === '/') {
                                new UrlHelper(props.history).redirectToCompletedSubmissions(found.id);
                            } else {
                                UrlHelper.setQueryString(`?competition=${competition.id}`);
                            }
                        };
                        return (
                            <DropdownItem
                                onClick={onSelectedCompetitionChanged}
                            >
                                {competition.name}
                            </DropdownItem>
                        );
                    })}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default withRouter(CompetitionSelectionDropDown);
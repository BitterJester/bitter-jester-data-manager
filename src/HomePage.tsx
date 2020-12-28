import {Button, Card} from "reactstrap";
import {Title} from "./Components/Title";
import CompetitionSelectionDropDown from "./Components/Sidebar/CompetitionSelectionDropDown";
import React, {useState} from "react";
import {useAuth0} from "./react-auth0-spa";
import {withRouter} from "react-router";

const HomePage = (props) => {
    const {isAuthenticated, user} = useAuth0();
    const [selectedCompetition, setSelectedCompetition] = useState({id: '', name: ''});
    const redirect = (path: string) => {
        props.history.push(path);
    };

    function redirectWithCompetitionQueryParam(path: string) {
        return () => redirect(`/${path}?competition=${selectedCompetition.id}`);
    }

    const areButtonsDisabled = selectedCompetition.id === '';
    const isAdmin = user.email.split('@')[1] === 'bitterjester.com' || user.email === 'spencer.kasper@gmail.com';
    return (
        <div className={'home-container'}>
            <Card>
                <Title titleDisplayText={"WELCOME TO THE BITTER JESTER DATA MANAGER"}/>
                <div className={'home-router'}>
                    {isAuthenticated ?
                        "Please select the competition you are judging for and navigate to the Original Song Competition page." :
                        "Please log in to gain access to the rest of the site."}
                    {isAuthenticated && (
                        <>
                            <CompetitionSelectionDropDown
                                setSelectedCompetition={setSelectedCompetition}
                                selectedCompetition={selectedCompetition}
                            />
                            <div className={'home-route-buttons'}>
                                <Button
                                    className='home-route-button'
                                    onClick={redirectWithCompetitionQueryParam('originalSong')}
                                    disabled={areButtonsDisabled}>
                                    Original Song Competition
                                </Button>
                                {isAuthenticated && isAdmin && (
                                    <>
                                        <Button
                                            className={' home-route-button'}
                                            disabled={areButtonsDisabled}
                                            onClick={redirectWithCompetitionQueryParam('completedSubmissions')}>
                                            Completed Submissions
                                        </Button>
                                        <Button
                                            className={'home-route-button'}
                                            disabled={areButtonsDisabled}
                                            onClick={redirectWithCompetitionQueryParam('incompleteApplications')}>
                                            Incomplete Applications
                                        </Button>
                                        <Button
                                            className={'home-route-button'}
                                            disabled={areButtonsDisabled}
                                            onClick={redirectWithCompetitionQueryParam('bjmf145results')}>
                                            Results
                                        </Button>
                                        <Button
                                            className={'home-route-button'}
                                            disabled={areButtonsDisabled}
                                            onClick={redirectWithCompetitionQueryParam('bjmf145auth')}>
                                            Band Schedule
                                        </Button>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default withRouter(HomePage);
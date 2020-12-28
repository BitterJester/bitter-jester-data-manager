import React, {useState} from "react";
import CompetitionSelectionDropDown from "./Components/Sidebar/CompetitionSelectionDropDown";
import {Button} from "reactstrap";
import AdminRouteButtons from "./AdminRouteButtons";
import {withRouter} from "react-router";

const AuthenticatedHomePage = (props) => {
    const [selectedCompetition, setSelectedCompetition] = useState({id: '', name: ''});
    const areButtonsDisabled = selectedCompetition.id === '';

    const redirect = (path: string) => {
        props.history.push(path);
    };

    const getRedirectWithCompetitionQueryParam = (path) => {
        return () => redirect(`/${path}?competition=${selectedCompetition.id}`);
    }

    return <>
        <div>
            Please select the competition you are judging for and navigate to the Original Song Competition page.
        </div>
        <div className={""}>
            <CompetitionSelectionDropDown
                setSelectedCompetition={setSelectedCompetition}
                selectedCompetition={selectedCompetition}
            />
        </div>
        <div className={"public-route-buttons"}>
            <Button
                className='home-route-button'
                onClick={getRedirectWithCompetitionQueryParam('originalSong')}
                disabled={areButtonsDisabled}>
                Original Song Competition
            </Button>
        </div>
        <AdminRouteButtons
            disabled={areButtonsDisabled}
            selectedCompetition={selectedCompetition}
        />
    </>;
};

export default withRouter(AuthenticatedHomePage);
import React, {useState} from "react";
import CompetitionSelectionDropDown from "./Sidebar/CompetitionSelectionDropDown";
import {Button} from "reactstrap";
import AdminRouteButtons from "./AdminRouteButtons";
import {withRouter} from "react-router";
import {AdminHomePageView} from "./AdminHomePageView";
import {UrlHelper} from "../utils/url-helper";

const AuthenticatedHomePage = (props) => {
    const [selectedCompetition, setSelectedCompetition] = useState({id: '', name: ''});
    const areButtonsDisabled = selectedCompetition.id === '';

    const urlHelper = new UrlHelper(props.history);

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
                onClick={() => urlHelper.redirectToOriginalSongCompetition(selectedCompetition.id)}
                disabled={areButtonsDisabled}>
                Original Song Competition
            </Button>
        </div>
        <AdminHomePageView
            disabled={areButtonsDisabled}
            selectedCompetition={selectedCompetition}
        />
    </>;
};

export default withRouter(AuthenticatedHomePage);
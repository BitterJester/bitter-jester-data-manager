import {Button} from "reactstrap";
import React, { Fragment } from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {UrlHelper} from "../utils/url-helper";
import {useSelector} from "react-redux";
import {DataManagerReduxStore} from "../redux/data-manager-redux-store";

interface Props extends RouteComponentProps {
    disabled: boolean;
}

function AdminRouteButtons(props: Props) {
    const selectedCompetition = useSelector((state: DataManagerReduxStore) => state.selectedCompetition);
    const {history} = props;

    const urlHelper = new UrlHelper(history);

    return (<div className={"admin-route-buttons"}>
        <Button
            className={" home-route-button"}
            onClick={() => urlHelper.redirectToCreateACompetition()}>
            Create a Competition
        </Button>
        <Button
            className={" home-route-button"}
            disabled={props.disabled}
            onClick={() => urlHelper.redirectToCompletedSubmissions(selectedCompetition.id)}>
            Completed Submissions
        </Button>
        <Button
            className={" home-route-button"}
            disabled={props.disabled}
            onClick={() => urlHelper.redirectToUploadedFiles(selectedCompetition.id)}>
            Uploaded Files
        </Button>
        <Button
            className={"home-route-button"}
            disabled={props.disabled}
            onClick={() => urlHelper.redirectToIncompleteApplications(selectedCompetition.id)}>
            Incomplete Applications
        </Button>
        {selectedCompetition.type === 'online' && <Fragment><Button
            className={"home-route-button"}
            disabled={props.disabled}
            onClick={() => urlHelper.redirectToSchedulePage(selectedCompetition.id)}>
            Original Song Competition Scheduler
        </Button>
        <Button
            className={"home-route-button"}
            disabled={props.disabled}
            onClick={() => urlHelper.redirectToResults(selectedCompetition.id)}>
            Results
        </Button></Fragment>}
    </div>);
}

export default withRouter(AdminRouteButtons);
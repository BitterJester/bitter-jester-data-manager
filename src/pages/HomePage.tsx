import {Card} from "reactstrap";
import {Title} from "../Components/Title";
import React from "react";
import {withRouter} from "react-router";
import AuthenticatedHomePage from "../Components/AuthenticatedHomePage";

const HomePage = () => {
    return (
        <div className={'home-container'}>
            <Card>
                <Title titleDisplayText={"WELCOME TO THE BITTER JESTER DATA MANAGER"}/>
                <div className={'home-router'}>
                    <AuthenticatedHomePage />
                </div>
            </Card>
        </div>
    );
};

export default withRouter(HomePage);
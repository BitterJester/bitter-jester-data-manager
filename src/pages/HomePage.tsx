import {Card} from "reactstrap";
import {Title} from "../Components/Title";
import React from "react";
import {withRouter} from "react-router";

const HomePage = () => {
    return (
        <div className={'home-container'}>
            <Card>
                <Title titleDisplayText={"WELCOME TO THE BITTER JESTER DATA MANAGER"}/>
            </Card>
        </div>
    );
};

export default withRouter(HomePage);
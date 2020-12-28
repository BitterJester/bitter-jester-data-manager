import {Card} from "reactstrap";
import {Title} from "./Components/Title";
import React from "react";
import {useAuth0} from "./react-auth0-spa";
import {withRouter} from "react-router";
import AuthenticatedHomePage from "./AuthenticatedHomePage";

const HomePage = () => {
    const {isAuthenticated} = useAuth0();

    return (
        <div className={'home-container'}>
            <Card>
                <Title titleDisplayText={"WELCOME TO THE BITTER JESTER DATA MANAGER"}/>
                <div className={'home-router'}>
                    {isAuthenticated ?
                        <AuthenticatedHomePage/> :
                        "Please log in to gain access to the rest of the site."
                    }
                </div>
            </Card>
        </div>
    );
};

export default withRouter(HomePage);
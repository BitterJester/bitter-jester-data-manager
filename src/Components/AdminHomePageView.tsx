import {useAuth0} from "../react-auth0-spa";
import React from "react";
import {CompetitionDropDownOption} from "./Sidebar/CompetitionSelectionDropDown";
import AdminRouteButtons from "./AdminRouteButtons";

interface Props {
    disabled: boolean;
}

export function AdminHomePageView(props: Props) {
    const {user} = useAuth0();
    const isAdmin = user.email.split('@')[1] === 'bitterjester.com';

    return <div>
        {isAdmin && (
            <>
                <p>
                    This row of buttons is for navigating to admin pages. This is only visible to accounts registered with
                    @bitterjester.com emails.
                </p>
                <AdminRouteButtons disabled={props.disabled}/>
            </>
        )}
    </div>;
}
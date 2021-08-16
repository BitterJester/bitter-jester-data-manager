import React from "react";
import AdminRouteButtons from "./AdminRouteButtons";
import {useSelector} from "react-redux";
import {DataManagerReduxStore} from "../redux/data-manager-redux-store";

interface Props {
    disabled: boolean;
}

export function AdminHomePageView(props: Props) {
    const {isAdmin} = useSelector((state: DataManagerReduxStore) => state.signInUserSession);
    return <div>
        {isAdmin && (
            <>
                <p>
                    This row of buttons is for navigating to admin pages. This is only visible to accounts registered
                    with
                    @bitterjester.com emails.
                </p>
                <AdminRouteButtons disabled={props.disabled}/>
            </>
        )}
    </div>;
}
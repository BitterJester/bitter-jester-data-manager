import {Alert, Button} from "reactstrap";
import React from "react";

export const SaveCommentsButton = (props: { alert: { color: string; isAlertOpen: boolean; message: string }, toggle: () => void, onClick: () => Promise<void>, songName: string, bandName: string }) =>
    <div>
        <Alert isOpen={props.alert.isAlertOpen} toggle={props.toggle}
               color={props.alert.color}>{props.alert.message}</Alert>
        <div className={"button-container"}>
            <Button className={"submit-button"} onClick={props.onClick}>
                {`Save comments for "${props.songName}" by the artist ${props.bandName}`}
            </Button>
        </div>
    </div>;
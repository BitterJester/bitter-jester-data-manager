import {Form} from "reactstrap";
import TextAreaFormInput from "../ TextAreaFormInput";
import React from "react";
import {JudgeFeedback} from "./OriginalSongJudgingFormCard";

type Props = {
    judgesComments: JudgeFeedback,
    updateJudgesComments: Function
}

export const JudgesCommentsForm = (props: Props) => {
    const {updateJudgesComments} = props;

    const updateInitialImpressions = (event) => {
        updateJudgesComments('initialImpression', event.target.value);
    };

    const updateFeedback = (event) => {
        updateJudgesComments('feedback', event.target.value);
    };

    const updateFavoriteAspect = (event) => {
        updateJudgesComments('favoriteAspect', event.target.value);
    };

    return (
        <Form className={"judges-comments-form"}>
            <TextAreaFormInput
                label={"What were your initial impressions?"}
                id={"initialImpressions"}
                updateParent={updateInitialImpressions}
                textAreaValue={props.judgesComments.initialImpression || ""}
            />
            <TextAreaFormInput label={"What feedback or suggestions would you give the artist(s)?"}
                               id={"feedback"}
                               updateParent={updateFeedback}
                               textAreaValue={props.judgesComments.feedback || ""}/>
            <TextAreaFormInput label={"What did you like most about what you heard? Please keep this positive."}
                               id={"favoriteAspect"}
                               updateParent={updateFavoriteAspect}
                               textAreaValue={props.judgesComments.favoriteAspect || ""}/>
        </Form>);
};
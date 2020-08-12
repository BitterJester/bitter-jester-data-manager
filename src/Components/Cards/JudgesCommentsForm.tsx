import {Form} from "reactstrap";
import TextAreaFormInput from "../ TextAreaFormInput";
import React from "react";
import {JudgeFeedback} from "./OriginalSongJudgingFormCard";

export const JudgesCommentsForm = (props: { updateParent: (event) => void, judgesComments: JudgeFeedback, updateParent1: (event) => void, updateParent2: (event) => void }) =>
    <Form className={"judges-comments-form"}>
        <TextAreaFormInput
            label={"What were your initial impressions?"}
            id={"initialImpressions"}
            updateParent={props.updateParent}
            textAreaValue={props.judgesComments.initialImpression || ""}
        />
        <TextAreaFormInput label={"What feedback or suggestions would you give the artist(s)?"}
                           id={"feedback"}
                           updateParent={props.updateParent1}
                           textAreaValue={props.judgesComments.feedback || ""}/>
        <TextAreaFormInput label={"What did you like most about what you heard? Please keep this positive."}
                           id={"favoriteAspect"}
                           updateParent={props.updateParent2}
                           textAreaValue={props.judgesComments.favoriteAspect || ""}/>
    </Form>;
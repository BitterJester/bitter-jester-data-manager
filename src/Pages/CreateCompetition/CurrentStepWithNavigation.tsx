import CardContainer from "../../Components/Cards/CardContainer";
import {Button} from "reactstrap";
import React from "react";
import {CreateCompetitionStep} from "./CreateCompetition";

type Props = {
    updateActiveStepIndex: (index: number) => void;
    activeStepIndex: number;
    steps: CreateCompetitionStep[];
}

export function CurrentStepWithNavigation(props: Props) {
    const {updateActiveStepIndex, activeStepIndex, steps} = props;
    const isOnReview = activeStepIndex === steps.length - 1;

    const onNextStep = () => {
        if(!isOnReview) {
            updateActiveStepIndex(activeStepIndex + 1);
        } else {
            // Kick off some process to create the file structure in s3 and fill with relevant files
        }
    };
    
    const onPreviousStep = () => {
        updateActiveStepIndex(activeStepIndex - 1);

    };
    const competitionStep = steps[activeStepIndex];
    const CurrentStepComponentDefinition = activeStepIndex < steps.length ?
        competitionStep.component :
        undefined;

    const competitionStepProps = competitionStep.props ? competitionStep.props : {};

    return <div className={"step-container"}>
        <CardContainer>
            {CurrentStepComponentDefinition && <CurrentStepComponentDefinition {...competitionStepProps}/>}
            <div className={"step-navigation-buttons"}>
                <div className={"navigation-button-container"}>
                    <Button
                        disabled={activeStepIndex === 0}
                        onClick={onPreviousStep}>
                        Previous
                    </Button>
                </div>
                <div className={"navigation-button-container"}>
                    <Button
                        disabled={activeStepIndex >= steps.length}
                        onClick={onNextStep}>
                        {!isOnReview ? "Next" : "Finish"}
                    </Button>
                </div>
            </div>
        </CardContainer>
    </div>;
}
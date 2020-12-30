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
    const onNextStep = () => {
        updateActiveStepIndex(activeStepIndex + 1);
    };

    const onPreviousStep = () => {
        updateActiveStepIndex(activeStepIndex - 1);
    };

    const competitionStep = steps[activeStepIndex];
    const CurrentStepComponentDefinition = activeStepIndex < steps.length ?
        competitionStep.component :
        undefined;
    const competitionStepProps = competitionStep.props ? competitionStep.props : {};

    const allStepsCompleted = activeStepIndex === steps.length - 1;

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
                        {!allStepsCompleted ? "Next" : "Finish"}
                    </Button>
                </div>
            </div>
        </CardContainer>
    </div>;
}
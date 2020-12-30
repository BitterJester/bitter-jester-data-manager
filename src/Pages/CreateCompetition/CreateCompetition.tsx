import React, {useState} from 'react';
import {Step, StepLabel, Stepper} from "@material-ui/core";
import {Button} from "reactstrap";
import {SelectCompetitionTypeStep} from "./SelectCompetitionTypeStep";

interface CreateCompetitionStep {
    component: Function;
    stepTitle: string;
    props?: object;
    stateField?: keyof CompetitionState;
}

export interface CompetitionType {
    id: 'online' | 'inPerson'
    displayName: string;
}

interface CompetitionState {
    type?: CompetitionType;
}

const CreateCompetition = () => {
    const [activeStepIndex, updateActiveStepIndex] = useState(0);
    const [competition, updateCompetition] = useState({} as CompetitionState);

    const applyUpdatesToCompetitionState = (updateObject) => {
        console.log(updateObject);
        updateCompetition({...competition, ...updateObject});
    };

    const steps: CreateCompetitionStep[] = [
        {
            component: SelectCompetitionTypeStep,
            stepTitle: 'Select Competition Type',
            props: {selectedCompetitionType: competition.type, updateCompetition: applyUpdatesToCompetitionState},
            stateField: 'type'
        },
        {component: () => <div>Yo.</div>, stepTitle: 'Schedule'},
        {component: () => <div>Hello.</div>, stepTitle: 'Select Judges'},
        {component: () => <div>Hey.</div>, stepTitle: 'Select Bands'},
    ];

    const competitionStep = steps[activeStepIndex];
    const CurrentStepComponentDefinition = activeStepIndex < steps.length ?
        competitionStep.component :
        undefined;
    const competitionStepProps = competitionStep.props ? competitionStep.props : {};
    console.log(competitionStep.props);

    const onNextStep = () => {
        updateActiveStepIndex(activeStepIndex + 1);
    };

    const onPreviousStep = () => {
        updateActiveStepIndex(activeStepIndex - 1);
    };

    const allStepsCompleted = activeStepIndex === steps.length - 1;

    return (
        <div>
            <Stepper activeStep={activeStepIndex}>
                {steps.map((step) => {
                    const competitionAttribute = step.stateField ? competition[step.stateField] : undefined;

                    return (
                        <Step key={step.stepTitle}>
                            <StepLabel>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <div>
                                        {step.stepTitle}:
                                    </div>
                                    <div>
                                        {competitionAttribute ? competitionAttribute.displayName : '-'}
                                    </div>
                                </div>
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            {CurrentStepComponentDefinition && <CurrentStepComponentDefinition {...competitionStepProps}/>}
            <Button disabled={activeStepIndex === 0} onClick={onPreviousStep}>Previous</Button>
            <Button
                disabled={activeStepIndex >= steps.length}
                onClick={onNextStep}>
                {!allStepsCompleted ? 'Next' : 'Finish'}
            </Button>
        </div>
    );
};

export default CreateCompetition;
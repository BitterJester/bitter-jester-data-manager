import React, {useState} from 'react';
import {Step, StepLabel, Stepper} from "@material-ui/core";
import {Button} from "reactstrap";

interface CreateCompetitionStep {
    component: Function;
    stepTitle: string;
}

const SelectCompetitionTypeStep = () => {
    return (
        <div>
            Hi.
        </div>
    )
}

const CreateCompetition = () => {
    const [activeStepIndex, updateActiveStepIndex] = useState(0);

    const steps: CreateCompetitionStep[] = [
        {component: SelectCompetitionTypeStep, stepTitle: 'Select Competition Type'},
        {component: () => <div>Hello.</div>, stepTitle: 'Schedule'},
    ];

    const CurrentStepComponentDefinition = steps[activeStepIndex].component;

    return (
        <div>
            <Stepper activeStep={activeStepIndex}>
                {steps.map(step => {
                    return (
                        <Step key={step.stepTitle}>
                            <StepLabel>
                                {step.stepTitle}
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            <CurrentStepComponentDefinition/>
            <Button onClick={() => updateActiveStepIndex(activeStepIndex + 1)}>Next Step</Button>
        </div>
    );
};

export default CreateCompetition;
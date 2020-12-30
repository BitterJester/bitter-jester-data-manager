import React, {useState} from 'react';
import {Step, StepLabel, Stepper} from "@material-ui/core";
import {Button, Card} from "reactstrap";
import {SelectCompetitionTypeStep} from "./SelectCompetitionTypeStep";
import Page from '../../Components/Page';
import CardContainer from "../../Components/Cards/CardContainer";
import {Title} from "../../Components/Title";

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

    const onNextStep = () => {
        updateActiveStepIndex(activeStepIndex + 1);
    };

    const onPreviousStep = () => {
        updateActiveStepIndex(activeStepIndex - 1);
    };

    const allStepsCompleted = activeStepIndex === steps.length - 1;

    return (
        <Page>
            <div className={'create-competition-container'}>
                <CardContainer>
                    <Title titleDisplayText={'Create a Competition'}/>
                    <p>
                        This is where you can schedule a competition. Please click through the steps and finalize your
                        choices at the end. This will add the competition to the home page and allow you to place bands
                        on the correct night as well as assign judges to a specified battle.
                    </p>
                </CardContainer>
                <Stepper alternativeLabel activeStep={activeStepIndex}>
                    {steps.map((step) => {
                        const competitionAttribute = step.stateField ? competition[step.stateField] : undefined;

                        return (
                            <Step key={step.stepTitle}>
                                <StepLabel>
                                    <div className={'step-label-content'}>
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
                <div className={'step-container'}>
                    <CardContainer>
                        {CurrentStepComponentDefinition && <CurrentStepComponentDefinition {...competitionStepProps}/>}
                        <div className={'step-navigation-buttons'}>
                            <div className={'navigation-button-container'}>
                                <Button
                                    disabled={activeStepIndex === 0}
                                    onClick={onPreviousStep}>
                                    Previous
                                </Button>
                            </div>
                            <div className={'navigation-button-container'}>
                                <Button
                                    disabled={activeStepIndex >= steps.length}
                                    onClick={onNextStep}>
                                    {!allStepsCompleted ? 'Next' : 'Finish'}
                                </Button>
                            </div>
                        </div>
                    </CardContainer>
                </div>
            </div>
        </Page>
    );
};

export default CreateCompetition;
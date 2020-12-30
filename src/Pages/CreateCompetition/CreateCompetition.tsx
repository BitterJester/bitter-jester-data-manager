import React, {useState} from 'react';
import {Step, StepLabel, Stepper} from "@material-ui/core";
import {SelectCompetitionTypeStep} from "./SelectCompetitionTypeStep";
import Page from '../../Components/Page';
import CardContainer from "../../Components/Cards/CardContainer";
import {Title} from "../../Components/Title";
import {CurrentStepWithNavigation} from "./CurrentStepWithNavigation";
import CompetitionTimeFrameStep from "./CompetitionTimeFrameStep";

export interface CreateCompetitionStep {
    component: Function;
    stepTitle: string;
    props?: object;
    stateField?: keyof CompetitionState;
}

export interface CompetitionType {
    id: 'online' | 'inPerson'
    selectedValue: string;
}

export interface CompetitionTimeFrame {
    start: Date;
    end: Date;
    selectedValue: string;
}

interface CompetitionState {
    type?: CompetitionType;
    timeFrame?: CompetitionTimeFrame;
}

const CreateCompetition = () => {
    const [activeStepIndex, updateActiveStepIndex] = useState(0);
    const [competition, updateCompetition] = useState({} as CompetitionState);
    console.log(competition);

    const applyUpdatesToCompetitionState = (updateObject) => {
        updateCompetition({...competition, ...updateObject});
    };

    const steps: CreateCompetitionStep[] = [
        {
            component: SelectCompetitionTypeStep,
            stepTitle: 'Select Competition Type',
            props: {
                selectedCompetitionType: competition.type,
                updateCompetition: applyUpdatesToCompetitionState
            },
            stateField: 'type'
        },
        {
            component: CompetitionTimeFrameStep,
            stepTitle: 'Schedule',
            props: {
                selectedCompetitionTimeFrame: competition.timeFrame,
                updateCompetition: applyUpdatesToCompetitionState
            },
            stateField: 'timeFrame'
        },
        {component: () => <div>Hello.</div>, stepTitle: 'Select Judges'},
        {component: () => <div>Hey.</div>, stepTitle: 'Select Bands'},
    ];

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
                                            {competitionAttribute ? competitionAttribute.selectedValue : '-'}
                                        </div>
                                    </div>
                                </StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
                <CurrentStepWithNavigation
                    activeStepIndex={activeStepIndex}
                    updateActiveStepIndex={updateActiveStepIndex}
                    steps={steps}
                />
            </div>
        </Page>
    );
};

export default CreateCompetition;
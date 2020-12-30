import React, {useState} from 'react';
import {Step, StepLabel, Stepper} from "@material-ui/core";
import {SelectCompetitionTypeStep} from "./SelectCompetitionTypeStep";
import Page from '../../Components/Page';
import CardContainer from "../../Components/Cards/CardContainer";
import {Title} from "../../Components/Title";
import {CurrentStepWithNavigation} from "./CurrentStepWithNavigation";
import CompetitionTimeFrameStep from "./CompetitionTimeFrameStep";
import JudgeSelectionTableStep from "./JudgeSelectionTableStep";
import {Judge} from "../../Components/Cards/OriginalSongJudgingFormCard";
import {JudgesInfo} from "../OriginalSongCompetition";
import BandSelectionTableStep from "./BandSelectionTableStep";
import ReviewStep from "./ReviewStep";

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

interface CompetitionJudges {
    judges: JudgesInfo[];
    selectedValue: string;
}

interface CompetitionBands {
    bands: object[];
    selectedValue: string;
}

export interface CompetitionState {
    type?: CompetitionType;
    timeFrame?: CompetitionTimeFrame;
    judges?: CompetitionJudges;
    bands?: CompetitionBands;
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
        {
            component: JudgeSelectionTableStep,
            stepTitle: 'Select Judges',
            props: {
                selectedCompetitionJudges: competition.judges || [],
                updateCompetition: applyUpdatesToCompetitionState
            },
            stateField: 'judges'
        },
        {
            component: BandSelectionTableStep,
            stepTitle: 'Select Bands',
            props: {
                selectedCompetitionBands: competition.bands || [],
                updateCompetition: applyUpdatesToCompetitionState
            }, stateField: 'bands'
        },
        {
            component: ReviewStep,
            stepTitle: 'Review',
            props: {
                competition
            }
        },
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
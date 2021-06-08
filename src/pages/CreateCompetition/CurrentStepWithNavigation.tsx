import CardContainer from "../../Components/Cards/CardContainer";
import {Button} from "reactstrap";
import React from "react";
import {CompetitionState, CreateCompetitionStep} from "./CreateCompetition";
import {S3Client} from "../../aws/s3Client";
import {getFromS3} from "../../aws/getFromS3";
import {CompetitionDropDownOption} from "../../Components/Sidebar/CompetitionSelectionDropDown";
import {JudgesInfo} from "../OriginalSongCompetition";

type Props = {
    updateActiveStepIndex: (index: number) => void;
    activeStepIndex: number;
    steps: CreateCompetitionStep[];
    competition: CompetitionState;
}

interface Competition {
    id: string;
    name: string;
    judges: JudgesInfo[];
    bands: object[];
    type: string;
    startDate: Date;
    endDate: Date;
}

export function CurrentStepWithNavigation(props: Props) {
    const {updateActiveStepIndex, activeStepIndex, steps, competition} = props;
    const isOnReview = activeStepIndex === steps.length - 1;

    const getCompetitionId = (competition: CompetitionState): string => {
        return `${competition.name.selectedValue.split(' ').join('_').toLowerCase().trim()}`
    }

    const formatCompetitionForS3 = (competition: CompetitionState): Competition => {
        return {
            id: getCompetitionId(competition),
            name: competition.name.selectedValue,
            bands: competition.bands.bands,
            judges: competition.judges.judges,
            startDate: competition.timeFrame.start,
            endDate: competition.timeFrame.end,
            type: competition.type.id,
        }
    }

    const onNextStep = async () => {
        if (!isOnReview) {
            updateActiveStepIndex(activeStepIndex + 1);
        } else {
            await getFromS3('all-competitions.json', async (data) => {
                const {competitions} = data;
                const updatedCompetitions = [
                    ...competitions,
                    formatCompetitionForS3(competition)
                ];
                const s3Client = new S3Client();
                await s3Client.put(s3Client.createPutPublicJsonRequest(
                    'bitter-jester-test',
                    'all-competitions.json',
                    JSON.stringify({competitions: updatedCompetitions}),
                    true,
                ));
            }, true);
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
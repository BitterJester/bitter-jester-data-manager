import CardContainer from "../../Components/Cards/CardContainer";
import {Button} from "reactstrap";
import React from "react";
import {CompetitionState, CreateCompetitionStep} from "./CreateCompetition";
import {JudgesInfo} from "../OriginalSongCompetition";
import {BitterJesterApiCompetitionsRequest} from "../../utils/api-requests/bitter-jester-api-competitions-request";
import {UrlHelper} from "../../utils/url-helper";
import {withRouter} from "react-router";

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
    type: string;
    startDate: Date;
    endDate: Date;
}

function CurrentStepWithNavigation(props) {
    const {updateActiveStepIndex, activeStepIndex, steps, competition} = props;
    const isOnReview = activeStepIndex === steps.length - 1;

    const getCompetitionId = (competition: CompetitionState): string => {
        return `${competition.name.selectedValue.split(' ').join('_').toLowerCase().trim()}`
    }

    const formatCompetitionForS3 = (competition: CompetitionState): Competition => {
        return {
            id: getCompetitionId(competition),
            name: competition.name.selectedValue,
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
            const bitterJesterApiCompetitionsRequest = new BitterJesterApiCompetitionsRequest();
            await bitterJesterApiCompetitionsRequest.saveCompetition(formatCompetitionForS3(competition));
            new UrlHelper(props.history).redirectToHomePage();
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

export default withRouter(CurrentStepWithNavigation);
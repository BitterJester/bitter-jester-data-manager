import React from 'react';
import {CompetitionState} from "./CreateCompetition";

type Props = {
    competition: CompetitionState;
}

const ReviewStep = (props) => {
    const {competition} = props;

    return (
        <div>
            <div>
                Type: {competition.type.selectedValue}
            </div>
            <div>
                Time Frame: {competition.timeFrame.selectedValue}
            </div>
            <div>
                Judges: {competition.judges.judges.map(judge => {
                return <div>
                    {`${judge.firstName} ${judge.lastName}`}
                </div>
            })}
            </div>
            <div>
                Bands: {competition.bands.bands.map(band => {
                    return <div>
                        {`${band.bandName}`}
                    </div>
            })}
            </div>
        </div>
    )
};

export default ReviewStep;
import React from 'react';
import {Card} from "reactstrap";
import {Title} from "../Title";

const OriginalSongJudgingFormCard = () => {
    return (
        <Card className={'original-song-judging-form-card'}>
            <div>
                <Title titleDisplayText={'JUDGING FORM'}/>
            </div>
        </Card>
    );
};

export default OriginalSongJudgingFormCard;
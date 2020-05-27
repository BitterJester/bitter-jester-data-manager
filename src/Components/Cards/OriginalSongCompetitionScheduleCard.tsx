import React, {useState} from 'react';
import {Card, Row} from "reactstrap";
import {DragAndDropList} from "../DragAndDrop/DragAndDropList";
import {Title} from "../Title";
import {OriginalSongs} from "../../Pages/OriginalSongCompetition";

type Props = {
    originalSongSubmissions: OriginalSongs;
}

const OriginalSongCompetitionScheduleCard = (props: Props) => {
    const [orderedDragAndDropItems, setOrderedDragAndDropItems] = useState([[]]);
    return (
        <Card className={'original-song-card'}>
            <Title titleDisplayText={'ORIGINAL SONG COMPETITION SCHEDULE'}/>
            <Row>
                <DragAndDropList initialOrderComponentsToDisplay={orderedDragAndDropItems}
                                 orderedColumnTitles={['Week 1', 'Week 2', 'Week 3', 'Week 4']}
                                 updateState={setOrderedDragAndDropItems}/>
            </Row>
        </Card>
    );
};

export default OriginalSongCompetitionScheduleCard;
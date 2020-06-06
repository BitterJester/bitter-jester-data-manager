import React, {useEffect, useState} from 'react';
import {Alert, Card, Col, Row} from "reactstrap";
import {DragAndDropList} from "../DragAndDrop/DragAndDropList";
import {Title} from "../Title";
import {OriginalSongs} from "../../Pages/OriginalSongCompetition";
import _ from 'lodash';
import SaveOriginalSongScheduleButton from "../SaveOriginalSongScheduleButton";

type Props = {
    originalSongSubmissions: OriginalSongs;
    setOriginalSongSubmissions: Function;
}

const OriginalSongCompetitionScheduleCard = (props: Props) => {
    const {originalSongSubmissions, setOriginalSongSubmissions} = props;
    const [orderedDragAndDropItems, setOrderedDragAndDropItems] = useState([[], [], [], [], [], []]);

    const updateSchedule = (columnRemovedFromIndex, rowRemovedFromIndex, columnAddedToIndex, rowAddedToIndex) => {
        const weekSongIsRemovedFrom = Number(columnRemovedFromIndex) + 1;
        const newWeekForSong = Number(columnAddedToIndex) + 1;

        const originalSongs = _.cloneDeep(originalSongSubmissions).originalSongs;
        const songBeingMoved = originalSongs
            .filter(song => song.scheduledWeek === weekSongIsRemovedFrom)[rowRemovedFromIndex];
        songBeingMoved.scheduledWeek = newWeekForSong;

        const indexOfSongToUpdate = originalSongs.findIndex(song => song.songName === songBeingMoved.songName);

        originalSongs[indexOfSongToUpdate] = songBeingMoved;
        setOriginalSongSubmissions({originalSongs});
    };

    const formatSongsForDisplay = (week: number) => {
        const originalSongs = originalSongSubmissions.originalSongs;
        const songFromWeek = originalSongs.filter(song => song.scheduledWeek === week);
        return songFromWeek.map(song => {
            return (
                <Col>
                    <div className={'song-title'}>
                        {`"${song.songName}"`}
                    </div>

                    <div className={'band-name'}>
                        {`by ${song.bandName}`}
                    </div>
                </Col>
            )
        })
    };

    useEffect(() => {
        const originalSongs = originalSongSubmissions.originalSongs;
        if (originalSongs.length > 0) {
            const updatedOrderedDragAndDropItems = [];

            updatedOrderedDragAndDropItems.push(formatSongsForDisplay(1));
            updatedOrderedDragAndDropItems.push(formatSongsForDisplay(2));
            updatedOrderedDragAndDropItems.push(formatSongsForDisplay(3));
            updatedOrderedDragAndDropItems.push(formatSongsForDisplay(4));
            updatedOrderedDragAndDropItems.push(formatSongsForDisplay(5));
            updatedOrderedDragAndDropItems.push(formatSongsForDisplay(6));
            setOrderedDragAndDropItems(updatedOrderedDragAndDropItems);

        }
    }, [originalSongSubmissions]);

    const [alert, setAlert] = useState({isOpen: false, color: 'success', message: ''});

    const toggle = () => {
        setAlert({...alert, isOpen: !alert.isOpen});
    };

    const orderedColumnTitles = [
        `Week 1 - ${orderedDragAndDropItems[0].length} bands`,
        `Week 2 - ${orderedDragAndDropItems[1].length} bands`,
        `Week 3 - ${orderedDragAndDropItems[2].length} bands`,
        `Week 4 - ${orderedDragAndDropItems[3].length} bands`,
        `Finalists - ${orderedDragAndDropItems[4].length} bands`,
        `Noncompeting Bands`
    ];
    return (
        <Card className={'original-song-card'}>
            <Alert isOpen={alert.isOpen} color={alert.color} toggle={toggle}>
                {alert.message}
            </Alert>
            <SaveOriginalSongScheduleButton
                onAlert={() => setAlert({...alert, message: 'Successfully updated the schedule.', isOpen: true})}
                originalSongs={originalSongSubmissions}/>
            <Title titleDisplayText={'ORIGINAL SONG COMPETITION SCHEDULE'}/>
            <Row>
                <DragAndDropList initialOrderComponentsToDisplay={orderedDragAndDropItems}
                                 orderedColumnTitles={orderedColumnTitles}
                                 updateState={updateSchedule}/>
            </Row>
        </Card>
    );
};

export default OriginalSongCompetitionScheduleCard;
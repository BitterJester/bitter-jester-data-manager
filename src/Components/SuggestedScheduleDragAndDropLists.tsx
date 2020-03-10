import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { Title } from './Title';
import { TableHeader } from './Table/TableHeader';
import { DragAndDropList } from './DragAndDrop/DragAndDropList';
import { SubmissionTableRow } from './Table/SubmissionTableRow';
import { Schedule } from '../Containers/ScheduleContainer';

type Props = {
    schedule: Schedule;
}

export const SuggestedScheduleDragAndDropLists = (props: Props) => {
    const { schedule } = props;
    const fridayNights = ['6/5', '6/12', '6/19', '6/26'];
    const foo = [];
    Object.values(schedule).forEach(nightSchedule => {
        foo.push(nightSchedule.map((schedule, index) => {
            return <SubmissionTableRow key={index} flattenedDataToDisplay={{ bandName: schedule.bandName }} />;
        }));
    });
    return (
        <Fragment>
            <Title titleDisplayText={'Suggested Friday Night Schedule'} />
            <TableHeader tableColumnNamesOrderedFromLeftToRight={fridayNights} />
            <Row>
                {
                    foo.map(bandNames => {
                        return <Col><DragAndDropList initialOrderComponentsToDisplay={bandNames} /></Col>
                    })
                }
            </Row>
        </Fragment>
    );
}
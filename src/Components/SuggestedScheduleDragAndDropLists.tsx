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
    const schedulesInformation = [];

    schedule.nights.forEach(night => {
        schedulesInformation.push(night.bands.map((app, index) => {
            return  <SubmissionTableRow key={index} flattenedDataToDisplay={{ bandName: app.bandName }} />;
        }));
    });

    
    return (
        <Fragment>
            <Title titleDisplayText={'Suggested Friday Night Schedule'} />
            <TableHeader tableColumnNamesOrderedFromLeftToRight={fridayNights} />
            <Row>
                {
                    schedulesInformation.map(bands => {
                        return <Col><DragAndDropList initialOrderComponentsToDisplay={bands} /></Col>
                    })
                }
            </Row>
        </Fragment>
    );
}
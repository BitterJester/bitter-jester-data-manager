import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { PrunedApplication } from '../Containers/SubmissionContainer';
import { Title } from './Title';
import { TableHeader } from './Table/TableHeader';
import { DragAndDropList } from './DragAndDrop/DragAndDropList';
import { SubmissionTableRow } from './Table/SubmissionTableRow';

type Props = {
    applications: PrunedApplication[];
}

export const SuggestedScheduleDragAndDropLists = (props: Props) => {
    const { applications } = props;
    const fridayNights = ['6/5', '6/12', '6/19', '6/26'];
    const bandNames = applications.map((prunedApplication, index) => {
        return <SubmissionTableRow key={index} flattenedDataToDisplay={{ bandName: prunedApplication.bandName }} />
    });
    return (
        <Fragment>
            <Title titleDisplayText={'Suggested Friday Night Schedule'} />
            <TableHeader tableColumnNamesOrderedFromLeftToRight={fridayNights} />
            <Row>
                {
                    fridayNights.map(night => {
                        return <Col><DragAndDropList initialOrderComponentsToDisplay={bandNames} /></Col>
                    })
                }
            </Row>
        </Fragment>
    );
}
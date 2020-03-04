import React from 'react';
import { SubmissionContainer, SubmissionsTableColumnNames } from './SubmissionContainer';
import { shallow } from 'enzyme';
import { Container } from 'reactstrap';
import { TableHeader } from '../Components/Table/TableHeader';
import { BitterJesterApplications } from '../Pages/Submissions/Submissions';
import { DragAndDropList } from '../Components/DragAndDrop/DragAndDropList';
import { SuggestedScheduleDragAndDropLists } from '../Components/SuggestedScheduleDragAndDropLists';
import { Title } from '../Components/Title';

describe('SubmissionTable', () => {
    const getSubmission = (bandName) => {
        return {
            id: 'id',
            bandName: bandName,
            primaryEmailAddress: 'primaryEmailAddress',
            firstChoiceFridayNight: 'firstChoiceFriday',
            secondChoiceFridayNight: 'secondChoiceFriday',
            isAvailableOnAllFridays: true
        }
    }

    const mockSubmissions: BitterJesterApplications = {
        completedApplications: [
            getSubmission('band1'),
            getSubmission('band2')
        ]
    };
    const component = shallow(<SubmissionContainer submissions={mockSubmissions} />);

    const container = component.find(Container);
    it('should render a container', () => {
        expect(container).toHaveLength(1);
    });

    it('should pass submission object keys as column names to table header', () => {
        const expected: SubmissionsTableColumnNames[] = [
            'Band Name',
            'Primary Email Address',
            'First Choice Friday',
            'Second Choice Friday'
        ];
        expect(component.find(TableHeader).props().tableColumnNamesOrderedFromLeftToRight).toEqual(expected);
    });

    it('should display a title', () => {
        expect(component.find(Title).props().titleDisplayText).toEqual('Completed Submissions');
    });
    

    describe('Drag and Drop', () => {
        it('should render a drag and drop list', () => {
            expect(component.find(DragAndDropList)).toBeDefined();
        })
    });

    describe('SuggestedSchedule', () => {
        const mockPrunedApplications = [
            {
                bandName: 'band1',
                primaryEmailAddress: 'primaryEmailAddress',
                firstChoiceFridayNight: 'firstChoiceFriday',
                secondChoiceFridayNight: 'secondChoiceFriday'
            },
            {
                bandName: 'band2',
                primaryEmailAddress: 'primaryEmailAddress',
                firstChoiceFridayNight: 'firstChoiceFriday',
                secondChoiceFridayNight: 'secondChoiceFriday'
            }
        ];

        it('should pass prunedApplications to suggested schedule component', () => {
            expect(component.find(SuggestedScheduleDragAndDropLists).props().applications).toEqual(mockPrunedApplications);
        });
    })
});
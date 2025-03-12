import React, {Fragment, useState} from 'react';
import {Button, Card, CardBody, CardHeader, Modal} from 'reactstrap';
import {S3Client} from '../../aws/s3Client';
import {LAST_SAVE_VERSION, Schedule} from '../../containers/ScheduleContainer';
import '../../static/css/saveScheduleButton.css';
import _ from 'lodash';
import {BitterJesterApiScheduleRequest} from "../../utils/api-requests/bitter-jester-api-schedule-request";
import {useSelector} from "react-redux";
import {DataManagerReduxStore} from "../../redux/data-manager-redux-store";

type Props = {
    schedule: Schedule,
    onAlert: Function
}

const SaveScheduleButton = (props: Props) => {
    const {schedule, onAlert} = props;
    const [isOpen, setIsOpen] = useState(false);
    const {selectedCompetition, competitions} = useSelector((state: DataManagerReduxStore) => {
        return ({competitions: state.appInfo.competitions, selectedCompetition: state.selectedCompetition});
    });
    const saveSchedule = async () => {
        // weird if i remove this i get an error related to circular dependencies
        new S3Client();
        const scheduleCopy = _.cloneDeep(schedule);
        scheduleCopy.version = LAST_SAVE_VERSION;
        await new BitterJesterApiScheduleRequest().saveSchedule(selectedCompetition.id, scheduleCopy);
        onAlert();
    };

    return (
        <Fragment>
            <Modal
                isOpen={isOpen}
            >
                <Card>
                    <CardHeader>
                        Are you sure you want to overwrite your saved schedule?
                    </CardHeader>
                    <CardBody>
                        <div style={{display: 'flex'}}>
                            <div style={{paddingRight: '8px'}}>
                                <Button
                                    style={{background: 'red'}}
                                    onClick={() => setIsOpen(false)}
                                >
                                    No, take me back!
                                </Button>
                            </div>
                            <div>
                                <Button
                                    style={{background: 'green'}}
                                    onClick={async () => {
                                        await saveSchedule();
                                        setIsOpen(false);
                                    }}
                                >
                                    Yes
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Modal>
            <div className={'saveScheduleButtonContainer'}>
                <Button className={'saveScheduleButton'} onClick={() => setIsOpen(true)}>Save Schedule...</Button>
            </div>
        </Fragment>
    );
}

export default SaveScheduleButton;
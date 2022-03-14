import React, {useEffect} from 'react';
import dataManagerReduxStore, {DataManagerReduxStore} from "../redux/data-manager-redux-store";
import {useSelector} from "react-redux";
import UploadedFilesTable from "../Components/uploaded-files/UploadedFilesTable";
import {Button, Card} from "reactstrap";
import {Title} from "../Components/Title";
import {BitterJesterApiApplicationsRequest} from "../utils/api-requests/bitter-jester-api-applications-request";

const UploadedFilesContainer = () => {
    const selectedFiles = useSelector((state: DataManagerReduxStore) => state.uploadedFiles.selectedFiles);
    const fetch = async () => {
        const applicationsApiRequest = new BitterJesterApiApplicationsRequest();
        const files = await applicationsApiRequest.getUploadedFiles();

        dataManagerReduxStore.dispatch({
            type: 'files/set',
            payload: {files: {files}}
        });
    }

    function timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }

    async function download(fileUrl, fileName) {
        const a = document.createElement("a");
        a.href = fileUrl;
        console.error(fileName);
        a.setAttribute("download", fileName);
        a.click();
        await timeout(2000);
    }

    const downloadSelectedFiles = async () => {
        for (let file of selectedFiles) {
            await download(file.url, file.fileName);
        }
    }

    useEffect(() => {
        fetch();
    }, []);

    return (
        <div>
            <Card>
                <Title titleDisplayText={'Uploaded Files'}/>
                <div style={{display: 'flex', padding: '24px'}}>
                    <Button
                        onClick={downloadSelectedFiles}>Download {selectedFiles.length} Selected</Button>
                </div>
                <UploadedFilesTable/>
            </Card>
        </div>
    );
};

export default UploadedFilesContainer;
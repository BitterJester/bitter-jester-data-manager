import React, {useEffect} from 'react';
import {getFromS3} from "../aws/getFromS3";
import dataManagerReduxStore, {DataManagerReduxStore} from "../redux/data-manager-redux-store";
import {useSelector} from "react-redux";
import UploadedFilesTable from "../Components/uploaded-files/UploadedFilesTable";
import {Button, Card} from "reactstrap";
import {Title} from "../Components/Title";
import axios from "axios";

const UploadedFilesContainer = () => {
    const selectedFiles = useSelector((state: DataManagerReduxStore) => state.uploadedFiles.selectedFiles);
    const fetch = async () => {
        return getFromS3('uploaded-files.json', (files) => {
            dataManagerReduxStore.dispatch({
                type: 'files/set',
                payload: {files}
            })
        });
    }

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }

    async function download(fileUrl, fileName) {
        const a = document.createElement("a");
        a.href = fileUrl;
        a.setAttribute("download", fileName);
        a.click();
        await timeout(2000);
    }

    const downloadSelectedFiles = async () => {
        for(let file of selectedFiles){
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
                    <Button onClick={downloadSelectedFiles}>Download {selectedFiles.length} Selected</Button>
                </div>
                <UploadedFilesTable/>
            </Card>
        </div>
    );
};

export default UploadedFilesContainer;
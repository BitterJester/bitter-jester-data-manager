import aws from 'aws-sdk';
import {GetObjectRequest} from 'aws-sdk/clients/s3';
import {UrlHelper} from "../utils/url-helper";

export function getCompetitionPrefixFromQueryParams() {
    return `competitions/competition=${UrlHelper.parseQueryParams().competition}`;
}

export const getFromS3 = async (key: string, setStateFunction: Function) => {
    const s3 = new aws.S3({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
    });

    async function getSubmissionsFromS3(key: string): Promise<void> {
        const s3ReadInfo: GetObjectRequest = {
            Bucket: 'bitter-jester-test',
            Key: `${getCompetitionPrefixFromQueryParams()}/${key}`
        };

        await s3.getObject(s3ReadInfo, (error, data) => {
            if (error) {
                console.error(error);
                throw error;
            } else {
                setStateFunction(JSON.parse(data.Body ? data.Body.toString() : ''));
            }
        });
    }

    await getSubmissionsFromS3(key);
}
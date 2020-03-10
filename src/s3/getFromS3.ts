import aws from 'aws-sdk';
import { GetObjectRequest } from 'aws-sdk/clients/s3';

export const getFromS3 = async (key: string, setStateFunction: Function) => {
    const s3 = new aws.S3({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
    });

    async function getSubmissionsFromS3(key: string): Promise<void> {
        const s3ReadInfo: GetObjectRequest = {
            Bucket: 'bitter-jester-test',
            Key: key
        };

        await s3.getObject(s3ReadInfo, (error, data) => {
            if (error) {
                console.error(error);
                throw error;
            }
            else {
                setStateFunction(JSON.parse(data.Body ? data.Body.toString() : ''));
            }
        });
    }

    getSubmissionsFromS3(key);
}
import {UrlHelper} from "../utils/url-helper";

export function getCompetitionPrefixFromQueryParams() {
    return `competitions/competition=${UrlHelper.parseQueryParams().competition}`;
}

export const getFromS3 = async (key: string, setStateFunction?: Function, isRoot: boolean = false) => {
    const s3 = null;

    async function getSubmissionsFromS3(key: string) {
        const finalKey = isRoot ? key : `${getCompetitionPrefixFromQueryParams()}/${key}`;
        const s3ReadInfo = {
            Bucket: 'bitter-jester-test',
            Key: finalKey
        };

        await s3.getObject(s3ReadInfo, (error, data) => {
            if (error) {
                console.error(error);
                throw error;
            } else if(setStateFunction){
                setStateFunction(JSON.parse(data.Body ? data.Body.toString() : ''));
            }
        });
    }

    await getSubmissionsFromS3(key);
}
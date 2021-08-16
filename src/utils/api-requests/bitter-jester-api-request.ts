import axios, {AxiosRequestConfig} from "axios";
import {UrlHelper} from "../url-helper";

const DOMAIN = 'https://api.bitter-jester-data-manager.com/';

function getFullPathWithCompetition(apiPart, path) {
    return `${DOMAIN}${apiPart}${UrlHelper.parseQueryParams().competition}${path}`;
}

export const API_URL_PATH_FUNCTIONS = {
    GET_COMPLETED_APPLICATIONS: () => getFullPathWithCompetition('applications/','/get-completed-applications'),
    GET_INCOMPLETE_APPLICATIONS: () => getFullPathWithCompetition('applications/', '/get-incomplete-applications'),
    GET_UPLOADED_FILES: () => getFullPathWithCompetition('applications/', '/get-uploaded-files'),
    GET_COMPETITIONS: () => `${DOMAIN}competitions/competitions`,
    GET_SCHEDULE: (lastSaved = false) => getFullPathWithCompetition('schedule/', lastSaved ? '/get-schedule?lastSaved=true' : '/get-schedule'),
    GET_REMOVED_BANDS: () => getFullPathWithCompetition('schedule/', '/get-removed-bands'),
    UPDATE_REMOVED_BANDS: () => getFullPathWithCompetition('schedule/', '/update-removed-bands')
}

class BitterJesterApiRequest {
    public HEADERS;

    constructor(apiKey) {
        this.HEADERS = {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        }
    }

    async get<T>(getPathFunction) {
        const response = await axios.get(getPathFunction()) as {data: {body: T}};
        return response.data ? response.data.body : null;
    }

    async post(getPathFunction, data) {
        const response = await axios.post(getPathFunction(), data, {headers: this.HEADERS});
        console.error(response);
        return response;
    }
}

export default BitterJesterApiRequest;
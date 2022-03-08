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
    GET_JUDGES: () => `${DOMAIN}competitions/judges`,
    GET_SCHEDULE: (lastSaved = false) => getFullPathWithCompetition('schedule/', lastSaved ? '/get-schedule?lastSaved=true' : '/get-schedule'),
    GET_REMOVED_BANDS: () => getFullPathWithCompetition('schedule/', '/get-removed-bands'),
    UPDATE_REMOVED_BANDS: () => getFullPathWithCompetition('schedule/', '/update-removed-bands')
}

class BitterJesterApiRequest {
    public HEADERS;

    constructor(apiKey) {
        this.HEADERS = {
            'Content-Type': 'application/json',
            'X-Api-Key': apiKey
        }
    }

    async get<T>(getPathFunction) {
        const response = await axios.get(getPathFunction(), {headers: this.HEADERS}) as {data: {body: T}};
        return response.data ? response.data.body : null;
    }

    async post<T>(getPathFunction, data) {
        const response = await axios.post<T>(getPathFunction(), data, {headers: this.HEADERS});
        console.error(response);
        return response;
    }

    getFullPathWithCompetition(apiPart, path) {
        return `${DOMAIN}${apiPart}competitionId/${UrlHelper.parseQueryParams().competition}${path}`;
    }

    getFullPathWithWeek(apiPart, path) {
        const week = UrlHelper.parseQueryParams().week ? UrlHelper.parseQueryParams().week : '1';
        return this.getFullPathWithCompetition(apiPart, `/week/${week}${path}`);
    }
}

export default BitterJesterApiRequest;
import axios from "axios";
import {UrlHelper} from "../url-helper";

const DOMAIN = 'https://api.bitter-jester-data-manager.com/';

function getFullPathWithCompetition(apiPart, path, params?) {
    return `${DOMAIN}${apiPart}${params.competitionId}${path}`;
}

export const API_URL_PATH_FUNCTIONS = {
    GET_COMPLETED_APPLICATIONS: (params) => getFullPathWithCompetition('applications/','/get-completed-applications', params),
    GET_INCOMPLETE_APPLICATIONS: (params) => getFullPathWithCompetition('applications/', '/get-incomplete-applications', params),
    GET_UPLOADED_FILES: (params) => getFullPathWithCompetition('applications/', '/get-uploaded-files', params),
    GET_COMPETITIONS: () => `${DOMAIN}competitions/competitions`,
    GET_JUDGES: () => `${DOMAIN}competitions/judges`,
    GET_JUDGES_V2: (params) => getFullPathWithCompetition('applications/', '/judges', params),
    GET_SCHEDULE: (lastSaved = false, params) => getFullPathWithCompetition('schedule/', lastSaved ? '/get-schedule?lastSaved=true' : '/get-schedule', params),
    SAVE_SCHEDULE: (params) => getFullPathWithCompetition('schedule/',  '/schedule', params),
    GET_REMOVED_BANDS: (params) => getFullPathWithCompetition('schedule/', '/get-removed-bands', params),
    UPDATE_REMOVED_BANDS: (params) => getFullPathWithCompetition('schedule/', '/update-removed-bands', params)
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
        return axios.post<T>(getPathFunction(), data, {headers: this.HEADERS});
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
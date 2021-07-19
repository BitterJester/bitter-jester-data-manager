import axios from "axios";
import {UrlHelper} from "./url-helper";

const DOMAIN = 'https://api.bitter-jester-data-manager.com/';

function getFullPathWithCompetition(apiPart, path) {
    return `${DOMAIN}${apiPart}${UrlHelper.parseQueryParams().competition}${path}`;
}

export const API_URL_PATH_FUNCTIONS = {
    GET_COMPLETED_APPLICATIONS: () => getFullPathWithCompetition('applications/','/get-completed-applications'),
    GET_INCOMPLETE_APPLICATIONS: () => getFullPathWithCompetition('applications/', '/get-incomplete-applications'),
    GET_UPLOADED_FILES: () => getFullPathWithCompetition('applications/', '/get-uploaded-files'),
    GET_COMPETITIONS: () => `${DOMAIN}competitions/competitions`,
    GET_SCHEDULE: (lastSaved = false) => getFullPathWithCompetition('schedule/', lastSaved ? '/get-schedule?lastSaved=true' : '/get-schedule')
}

class BitterJesterApiRequest {
    static async get<T>(getPathFunction) {
        const response = await axios.get(getPathFunction()) as {data: {body: T}};
        return response.data.body;
    }
}

export default BitterJesterApiRequest;
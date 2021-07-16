import axios from "axios";
import {UrlHelper} from "./url-helper";

export const API_URL_PATHS = {
    COMPLETED_SUBMISSIONS: 'completed-submissions',
    RENAMED_FILES: 'renamed-files',
    UPDATE_SCHEDULE: 'update-schedule',
    SAVED_SCHEDULE: 'saved-schedule',
    COMPETITIONS: 'competitions/competitions'
}

const DOMAIN = 'https://api.bitter-jester-data-manager.com/';

class BitterJesterApiRequest {
    static async get<T>(path, includeCompetitionPath = true) {
        let fullPath
        if(includeCompetitionPath){
            const competitionId = UrlHelper.parseQueryParams().competition;
            fullPath = `${DOMAIN}v1/${competitionId}/${path}`;
        } else {
            fullPath = `${DOMAIN}${path}`;
        }
        const response = await axios.get(fullPath) as {data: {body: T}};
        return response.data.body;
    }
}

export default BitterJesterApiRequest;
import axios from "axios";
import {UrlHelper} from "./url-helper";

export const API_URL_PATHS = {
    COMPLETED_SUBMISSIONS: 'completed-submissions',
    RENAMED_FILES: 'renamed-files',
    UPDATE_SCHEDULE: 'update-schedule'
}

const DOMAIN = 'https://api.bitter-jester-data-manager.com/v1/';

class BitterJesterApiRequest {
    static async get<T>(path) {
        const competitionId = UrlHelper.parseQueryParams().competition;
        const response = await axios.get(`${DOMAIN}${competitionId}/${path}`) as {data: {body: T}};
        return response.data.body;
    }
}

export default BitterJesterApiRequest;
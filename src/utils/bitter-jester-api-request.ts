import axios from "axios";
import {UrlHelper} from "./url-helper";

export const API_URL_PATHS = {
    COMPLETED_SUBMISSIONS: 'completed-submissions',
    RENAMED_FILES: 'renamed-files',
    UPDATE_SCHEDULE: 'update-schedule'
}

class BitterJesterApiRequest {
    static async get<T>(path) {
        const competitionId = UrlHelper.parseQueryParams().competition;
        const response = await axios.get(`https://cdqnw3o987.execute-api.us-east-1.amazonaws.com/prod/${competitionId}/${path}`) as {data: {body: T}};
        return response.data.body;
    }
}

export default BitterJesterApiRequest;
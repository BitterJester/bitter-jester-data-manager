import axios from "axios";
import {UrlHelper} from "./url-helper";

class BitterJesterApiRequest {
    static async get<T>(path) {
        const competitionId = UrlHelper.parseQueryParams().competition;
        const response = await axios.get(`https://hti7djrlml.execute-api.us-east-1.amazonaws.com/prod/${competitionId}/${path}`) as {data: {body: T}};
        return response.data.body;
    }
}

export default BitterJesterApiRequest;
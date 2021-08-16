import BitterJesterApiRequest, {API_URL_PATH_FUNCTIONS} from "./bitter-jester-api-request";

export class BitterJesterApiCompetitionsRequest extends BitterJesterApiRequest {
    constructor() {
        super(process.env.REACT_APP_COMPETITIONS_API_KEY);
    }

    getAllCompetitions(){
        return this.get<{competitions: {type: string}[]}>(API_URL_PATH_FUNCTIONS.GET_COMPETITIONS);
    }
}
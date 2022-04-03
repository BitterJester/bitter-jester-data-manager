import BitterJesterApiRequest, {API_URL_PATH_FUNCTIONS} from "./bitter-jester-api-request";

export class BitterJesterApiCompetitionsRequest extends BitterJesterApiRequest {
    constructor() {
        super(process.env.REACT_APP_COMPETITIONS_API_KEY);
    }

    getAllCompetitions(){
        return this.get<{competitions: {type: string}[]}>(API_URL_PATH_FUNCTIONS.GET_COMPETITIONS);
    }

    getAllJudges(){
        return this.get<{judges: any[]}>(API_URL_PATH_FUNCTIONS.GET_JUDGES);
    }

    async saveCompetition(competition: any): Promise<{competitions: any[]}>{
        const updatedCompetitions = await this.post<{competitions: any[]}>(API_URL_PATH_FUNCTIONS.GET_COMPETITIONS, {competition});
        return updatedCompetitions.data;
    }
}
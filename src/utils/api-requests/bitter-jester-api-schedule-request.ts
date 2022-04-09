import BitterJesterApiRequest, {API_URL_PATH_FUNCTIONS} from "./bitter-jester-api-request";
import {Schedule} from "../../containers/ScheduleContainer";

export class BitterJesterApiScheduleRequest extends BitterJesterApiRequest {
    constructor() {
        super(process.env.REACT_APP_SCHEDULE_API_KEY);
    }

    getSchedule(competitionId, isLastSaved = false){
        return this.get<Schedule>(() => API_URL_PATH_FUNCTIONS.GET_SCHEDULE(isLastSaved, {competitionId}));
    }

    saveSchedule(competitionId, schedule: Schedule){
        return this.post<Schedule>(() => API_URL_PATH_FUNCTIONS.SAVE_SCHEDULE({competitionId}), schedule);
    }

    getRemovedBands(competitionId){
        return this.get<{ removedBands: string[] }>(() => API_URL_PATH_FUNCTIONS.GET_REMOVED_BANDS({competitionId}));
    }

    updateRemovedBands(removedBands, competitionId){
        return this.post(() => API_URL_PATH_FUNCTIONS.UPDATE_REMOVED_BANDS({competitionId}), {removedBands});
    }
}
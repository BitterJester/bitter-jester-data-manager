import BitterJesterApiRequest, {API_URL_PATH_FUNCTIONS} from "./bitter-jester-api-request";
import {UploadedFile} from "../../redux/reducers/uploadedFilesReducer";
import {BitterJesterApplications} from "../../pages/Submissions";
import {IncompleteApplication} from "../../containers/IncompleteApplicationsContainer";

export class BitterJesterApiApplicationsRequest extends BitterJesterApiRequest {
    constructor() {
        super(process.env.REACT_APP_APPLICATIONS_API_KEY);
    }

    getCompletedApplications(competitionId){
        return this.get<BitterJesterApplications>(() => API_URL_PATH_FUNCTIONS.GET_COMPLETED_APPLICATIONS({competitionId}));
    }

    getIncompleteApplications(competitionId){
        return this.get<{ incompleteApplications: IncompleteApplication[] }>(() => API_URL_PATH_FUNCTIONS.GET_INCOMPLETE_APPLICATIONS({competitionId}));
    }

    getUploadedFiles(competitionId){
        return this.get<UploadedFile[]>(() => API_URL_PATH_FUNCTIONS.GET_UPLOADED_FILES({competitionId}));
    }
}
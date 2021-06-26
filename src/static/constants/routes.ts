import {Submissions} from "../../pages/Submissions";
import {IncompleteApplications} from "../../pages/IncompleteApplications";
import OriginalSongCompetition from "../../pages/OriginalSongCompetition";
import OriginalSongCompetitionSchedulePage from "../../pages/OriginalSongCompetitionSchedulePage";
import OriginalSongResults from "../../pages/OriginalSongResults";
import CreateCompetition from "../../pages/CreateCompetition/CreateCompetition";
import UploadedFilesPage from "../../pages/UploadedFilesPage";

interface RouteInfo {
    route: string;
    component: Function;
}

interface Routes {
    originalSongCompetition: RouteInfo;
    completedSubmissions: RouteInfo;
    incompleteApplications: RouteInfo;
    fridayNightScheduler: RouteInfo;
    originalSongResults: RouteInfo;
    createACompetition: RouteInfo;
    uploadedFiles: RouteInfo;
}

export const ROUTES: Routes = {
    originalSongCompetition: {
        route: '/originalSong',
        component: OriginalSongCompetition
    },
    completedSubmissions: {
        route: '/completedSubmissions',
        component: Submissions
    },
    incompleteApplications: {
        route: '/incompleteApplications',
        component: IncompleteApplications
    },
    fridayNightScheduler: {
        route: '/bjmf145auth',
        component: OriginalSongCompetitionSchedulePage
    },
    originalSongResults: {
        route: '/bjmf145results',
        component: OriginalSongResults
    },
    createACompetition: {
        route: '/createCompetition',
        component: CreateCompetition
    },
    uploadedFiles: {
        route: '/uploadedFiles',
        component: UploadedFilesPage
    }
}
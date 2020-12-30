import {Submissions} from "../../Pages/Submissions";
import {IncompleteApplications} from "../../Pages/IncompleteApplications";
import OriginalSongCompetition from "../../Pages/OriginalSongCompetition";
import OriginalSongCompetitionSchedulePage from "../../Pages/OriginalSongCompetitionSchedulePage";
import OriginalSongResults from "../../Pages/OriginalSongResults";
import {ReactComponentElement} from "react";

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
    }
}
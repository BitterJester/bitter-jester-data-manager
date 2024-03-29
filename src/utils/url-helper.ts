import {ROUTES} from "../static/constants/routes";

export class UrlHelper {
    private parsedQueryParams: object;
    private history;

    constructor(history) {
        this.parsedQueryParams = UrlHelper.parseQueryParams();
        this.history = history;
    }

    public static setQueryString(queryString) {
        if (window.history.pushState) {
            const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryString;
            window.history.pushState({path:newurl},'',newurl);
        }
    }

    public static parseQueryParams() {
        const queryString = window.location.search;
        const queryStringWithQuestionRemoved = queryString.slice(1, queryString.length);
        const keyValuePairs = queryStringWithQuestionRemoved.split('&')
            .map(keyValuePair => {
                const keyThenValue = keyValuePair.split('=');
                return {[keyThenValue[0]]: keyThenValue[1]};
            });
        return keyValuePairs.reduce(((previousValue, currentValue) => ({
            ...previousValue,
            ...currentValue
        })));
    }

    public redirectToCreateACompetition() {
        this.redirectWithQueryParams(ROUTES.createACompetition.route, {});
    }

    public redirectToOriginalSongCompetition(competitionId) {
        this.redirectWithQueryParams(ROUTES.originalSongCompetition.route, {competition: competitionId});
    }

    public redirectToCompletedSubmissions(competitionId) {
        this.redirectWithQueryParams(ROUTES.completedSubmissions.route, {competition: competitionId});
    }

    public redirectToUploadedFiles(competitionId) {
        this.redirectWithQueryParams(ROUTES.uploadedFiles.route, {competition: competitionId});
    }

    public redirectToIncompleteApplications(competitionId) {
        this.redirectWithQueryParams(ROUTES.incompleteApplications.route, {competition: competitionId});
    }


    public redirectToResults(competitionId) {
        this.redirectWithQueryParams(ROUTES.originalSongResults.route, {competition: competitionId});
    }


    public redirectToSchedulePage(competitionId) {
        this.redirectWithQueryParams(ROUTES.fridayNightScheduler.route, {competition: competitionId});
    }

    public redirectToHomePage() {
        this.redirect('/');
    }

    private redirectWithQueryParams(path, queryParamMap) {
        const queryParamString = Object.keys(queryParamMap)
            .map(queryParam => `${queryParam}=${queryParamMap[queryParam]}`)
            .join('&');
        this.redirect(`${path}?${queryParamString}`);
    }

    private redirect(path) {
        this.history.push(path);
    }
}
import BitterJesterApiRequest from "./bitter-jester-api-request";

export class BitterJesterApiOriginalSongCompetitionRequest extends BitterJesterApiRequest {
    private readonly API_PART;

    constructor() {
        super(process.env.REACT_APP_ORIGINAL_SONG_COMPETITION_API_KEY);

        this.API_PART = 'original-song-competition/';
    }

    getOriginalSongCompetitionApplications() {
        return this.get<any>(() => this.getFullPathWithCompetition(this.API_PART, '/get-applications'));
    }

    getScoresForSongsInWeek() {
        return this.get<any>(() => this.getFullPathWithWeek(this.API_PART, '/get-scores-for-week'));
    }
}
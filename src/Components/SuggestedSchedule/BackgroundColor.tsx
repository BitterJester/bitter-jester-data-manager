import {getNightMap} from "../../utils/getNightMap";

export class BackgroundColor {
    application;
    night: number;

    constructor(application, night: number) {
        this.application = application;
        this.night = night;
    }

    get(competitionId) {
        const nightMap = getNightMap(competitionId)
        const nightParts = nightMap[String(this.night)];
        const didGetFirstChoice = this.application.firstChoiceFridayNight.includes(nightParts.dayOfTheMonth);

        if(this.application.isBandAvailableOnAllFridays || didGetFirstChoice) {
            return 'darkgreen';
        }

        const didGetSecondChoice = this.application.secondChoiceFridayNight.includes(nightParts);

        if(didGetSecondChoice){
            return 'rgb(227, 194, 27)';
        }

        const isUnavailable = this.application.unavailableFridayNights ? 
            Boolean(this.application.unavailableFridayNights.map(night => night.includes(nightParts)).filter(item => item === true).length) :
            false;

        if(isUnavailable){
            return 'red';
        }

        return 'orange';
    }
}

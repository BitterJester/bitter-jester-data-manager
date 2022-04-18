import {getNightMap} from "../../utils/getNightMap";

export class BackgroundColor {
    application;
    night: number;

    constructor(application, night: number) {
        this.application = application;
        this.night = night;
    }

    get(competitionId) {
        const nightMap = getNightMap(competitionId);
        const nightParts = nightMap[String(this.night)];
        const dayOfTheMonth = nightParts.dayOfTheMonth;
        const didGetFirstChoice = this.application.firstChoiceFridayNight.includes(` ${dayOfTheMonth},`) ||
            this.application.firstChoiceFridayNight === 'Available Every Friday';
        if(didGetFirstChoice) {
            return 'darkgreen';
        }
        const didGetSecondChoice = this.application.secondChoiceFridayNight.includes(` ${dayOfTheMonth},`);

        if(didGetSecondChoice){
            return 'rgb(227, 194, 27)';
        }
        const isUnavailable = this.application.unavailableFridayNights ?
            Boolean(this.application.unavailableFridayNights.map(night => night.includes(` ${dayOfTheMonth},`)).filter(item => item === true).length) :
            false;

        if(isUnavailable){
            return 'red';
        }

        return 'orange';
    }
}

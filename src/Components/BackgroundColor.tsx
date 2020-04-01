import { BitterJesterApplication } from '../Pages/Submissions/Submissions';

export class BackgroundColor {
    application: BitterJesterApplication;
    night: number;

    constructor(application: BitterJesterApplication, night: number) {
        this.application = application;
        this.night = night;
    }

    get() {
        const nightMap = {
            '1': 'June 5',
            '2': 'June 12',
            '3': 'June 19',
            '4': 'June 26'
        }

        const nightString = nightMap[String(this.night)];
        const didGetFirstChoice = this.application.firstChoiceFridayNight.includes(nightString);

        if(this.application.isAvailableOnAllFridays || didGetFirstChoice) {
            return 'lightgreen';
        }

        const didGetSecondChoice = this.application.secondChoiceFridayNight.includes(nightString);

        if(didGetSecondChoice){
            return 'lightyellow';
        }

        return 'red';
    }
}

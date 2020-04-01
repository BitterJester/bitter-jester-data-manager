export class BackgroundColor {
    application;
    night: number;

    constructor(application, night: number) {
        this.application = application;
        this.night = night;
    }

    get() {
        const nightMap = {
            '1': '5',
            '2': '12',
            '3': 'June 19',
            '4': '26'
        }

        const nightString = nightMap[String(this.night)];
        const didGetFirstChoice = this.application.firstChoiceFridayNight.includes(nightString);

        if(this.application.isBandAvailableOnAllFridays || didGetFirstChoice) {
            return 'lightgreen';
        }

        const didGetSecondChoice = this.application.secondChoiceFridayNight.includes(nightString);

        if(didGetSecondChoice){
            return 'lightyellow';
        }

        return 'red';
    }
}

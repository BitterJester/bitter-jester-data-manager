export class BackgroundColor {
    application;
    night: number;

    constructor(application, night: number) {
        this.application = application;
        this.night = night;
    }

    get() {
        const nightMap = {
            '1': '23',
            '2': '30',
            '3': '6',
            '4': '13'
        }

        const nightString = nightMap[String(this.night)];
        const didGetFirstChoice = this.application.firstChoiceFridayNight.includes(nightString);

        if(this.application.isBandAvailableOnAllFridays || didGetFirstChoice) {
            return 'darkgreen';
        }

        const didGetSecondChoice = this.application.secondChoiceFridayNight.includes(nightString);

        if(didGetSecondChoice){
            return 'rgb(227, 194, 27)';
        }

        const isUnavailable = this.application.unavailableFridayNights ? 
            Boolean(this.application.unavailableFridayNights.map(night => night.includes(nightString)).filter(item => item === true).length) :
            false;

        if(isUnavailable){
            return 'red';
        }

        return 'orange';
    }
}

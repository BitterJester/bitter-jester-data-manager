import { BackgroundColor } from './BackgroundColor';

describe('BackgroundColor', () => {
    const getApplication = (isAvailableOnAllFridays: boolean) => {
        return {
            id: 'id',
            isBandAvailableOnAllFridays: isAvailableOnAllFridays,
            bandName: 'band1',
            primaryEmailAddress: 'email',
            primaryPhoneNumber: 'phone',
            citiesRepresented: 'cities',
            firstChoiceFridayNight: 'June 5, 2019',
            secondChoiceFridayNight: 'June 12, 2019'
        };
    }

    it('should return light green for fully available', () => {
        expect(new BackgroundColor(getApplication(true), 1).get()).toEqual('lightgreen');
    });

    it('should return light green for first choice', () => {
        expect(new BackgroundColor(getApplication(false), 1).get()).toEqual('lightgreen');
    });

    it('should return light yellow for second choice friday night', () => {
        expect(new BackgroundColor(getApplication(false), 2).get()).toEqual('rgb(227, 194, 27)');
    });

    it('should return red for rest', () => {
        expect(new BackgroundColor(getApplication(false), 3).get()).toEqual('orange');
    });
});
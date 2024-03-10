const DEFAULT_DAYS = {
    1: {dayOfTheMonth: '20', month: '5'},
    2: {dayOfTheMonth: '27', month: '5'},
    3: {dayOfTheMonth: '3', month: '6'},
    4: {dayOfTheMonth: '10', month: '6'},
};
export const getNightMap = (competitionId: string) => {
    if (competitionId === 'bitter_jester_summer_2021') {
        return {
            1: {dayOfTheMonth: '23', month: '5'},
            2: {dayOfTheMonth: '30', month: '5'},
            3: {dayOfTheMonth: '6', month: '6'},
            4: {dayOfTheMonth: '13', month: '6'}
        };
    } else if (competitionId === 'bitter_jester_summer_2022') {
        return DEFAULT_DAYS;
    } else if (competitionId === 'bitter_jester_summer_2023') {
        return {
            1: {dayOfTheMonth: '2', month: '6'},
            2: {dayOfTheMonth: '3', month: '6'},
            3: {dayOfTheMonth: '9', month: '6'},
            4: {dayOfTheMonth: '10', month: '6'}
        };
    } else if (competitionId === 'bitter_jester_summer_2024') {
        return {
            1: {dayOfTheMonth: '7', month: '6'},
            2: {dayOfTheMonth: '8', month: '6'},
            3: {dayOfTheMonth: '14', month: '6'},
            4: {dayOfTheMonth: '15', month: '6'}
        };
    } else {
        return DEFAULT_DAYS
    }
}
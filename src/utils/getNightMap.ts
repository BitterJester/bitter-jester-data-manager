export const getNightMap = (competitionId: string) => {
    if (competitionId === 'bitter_jester_summer_2021') {
        return {
            1: {dayOfTheMonth: '23', month: '5'},
            2: {dayOfTheMonth: '30', month: '5'},
            3: {dayOfTheMonth: '6', month: '6'},
            4: {dayOfTheMonth: '13', month: '6'}
        };
    } else {
        return {
            1: {dayOfTheMonth: '20', month: '5'},
            2: {dayOfTheMonth: '27', month: '5'},
            3: {dayOfTheMonth: '3', month: '6'},
            4: {dayOfTheMonth: '10', month: '6'},
        }
    }
}
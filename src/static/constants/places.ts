export type Place = {
    placement: number;
    placementName: string;
    value: number;
}

const createPlace = (placement: number, placeAsEnglishWord: string, pointValue: number): Place => {
    return {
        placement,
        placementName: `${placeAsEnglishWord} Place`,
        value: pointValue
    }
};

export const PLACES = [
    createPlace(1, 'First', 3),
    createPlace(2, 'Second', 2),
    createPlace(3, 'Third', 1)
];
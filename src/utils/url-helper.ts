export class UrlHelper {
    private parsedQueryParams: object;

    constructor() {
        this.parsedQueryParams = UrlHelper.parseQueryParams();
    }

    public static parseQueryParams() {
        const queryString = window.location.search;
        const queryStringWithQuestionRemoved = queryString.slice(1, queryString.length);
        const keyValuePairs = queryStringWithQuestionRemoved.split('&')
            .map(keyValuePair => {
                const keyThenValue = keyValuePair.split('=');
                return {[keyThenValue[0]]: keyThenValue[1]};
            });
        return keyValuePairs.reduce(((previousValue, currentValue) => ({
            ...previousValue,
            ...currentValue
        })));
    }
}
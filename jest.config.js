module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFiles: [
        './setupTests.ts'
    ],
    moduleNameMapper: {
        "\\.(css|less|png)$": "<rootDir>/mocks/styleMock.js",
        'react-pdf/dist/entry.webpack': '<rootDir>/mocks/reactPdfMock.js'
    }
}
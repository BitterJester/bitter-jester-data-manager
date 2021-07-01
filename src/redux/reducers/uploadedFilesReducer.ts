export interface UploadedFile {
    fileName: string;
    fileType: string;
    type: string;
    bandName: string;
    url: string;
    title?: string;
}

interface UploadedFilesReduxState {
    files: UploadedFile[],
    selectedFiles: UploadedFile[],
}

const initialState: UploadedFilesReduxState = {
    files: [],
    selectedFiles: [],
};

export default function uploadedFilesReducer(state = initialState, action) {
    switch (action.type) {
        case 'files/set':
            const payload = action.payload;
            console.error('payload: ', payload);
            return {
                ...state,
                ...(payload.files !== undefined && payload.files),
                ...(payload.selectedFiles !== undefined && {selectedFiles: payload.selectedFiles}),
            }
        default:
            return state
    }
}
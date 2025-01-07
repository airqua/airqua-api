import {GenericOk} from "../types/domain/private";

const getErrorMessage = (errorCode: number) => {
    switch (errorCode) {
        case 400:
            return 'Bad request';
        case 401:
            return 'Authorization failed';
        case 403:
            return 'Forbidden';
        case 404:
            return 'Not found';
        default:
            return 'Something went terribly wrong, contact hi@airqua.uk';
    }
}

export const ok = <T>(payload?: T): GenericOk & { payload?: T } => ({
    status: 'Ok',
    payload
});

export const error = <T extends 400 | 401 | 403 | 404 | number, K>(code: T, payload?: K) => ({
    status: 'Error',
    error: getErrorMessage(code),
    payload
})
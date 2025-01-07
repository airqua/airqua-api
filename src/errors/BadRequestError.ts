import {GenericError} from "./GenericError";

export class BadRequestError extends GenericError {
    type = 'BadRequestError' as const;

    constructor(payload?: any) {
        super(payload);
    }
}

export const isBadRequestError = (e: any): e is BadRequestError => e.type === 'BadRequestError';
import {GenericError} from "./GenericError";

export class UnauthError extends GenericError {
    type = "UnauthError" as const;

    constructor(payload?: any) {
        super(payload);
    }
}

export const isUnauthError = (e: any): e is UnauthError => e.type === 'UnauthError';
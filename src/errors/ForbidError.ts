import {GenericError} from "./GenericError";

export class ForbidError extends GenericError {
    type = 'ForbidError' as const;

    constructor(payload?: any) {
        super(payload);
    }
}

export const isForbidError = (e: any): e is ForbidError => e.type === 'ForbidError';
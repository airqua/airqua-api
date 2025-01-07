import {GenericError} from "./GenericError";

export class NotFoundError extends GenericError {
    type = "NotFoundError" as const;

    constructor(payload?: any) {
        super(payload);
    }
}

export const isNotFoundError = (e: any): e is NotFoundError => e.type === 'NotFoundError';
import {GenericError} from "./GenericError";

export class InternalError extends GenericError {
    type = "InternalError" as const;

    constructor(payload?: any) {
        super(payload);
    }
}

export const isInternalError = (e: any): e is InternalError => e.type === 'InternalError';
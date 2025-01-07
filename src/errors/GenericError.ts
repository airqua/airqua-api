export class GenericError extends Error {
    type = "GenericError";
    payload: any;

    constructor(payload?: any) {
        super();
        this.payload = payload;
    }
}
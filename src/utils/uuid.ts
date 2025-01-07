import {parse, stringify} from "uuid";

export const fromBinaryUuid = (binary: Uint8Array<ArrayBufferLike>) => stringify(binary);
export const toBinaryUuid = (uuid: string) => Buffer.from(parse(uuid));
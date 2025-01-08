import {parse, stringify, v7} from "uuid";

export const makeUuid = () => toBinaryUuid(v7() as string);
export const fromBinaryUuid = (binary: Uint8Array<ArrayBufferLike>) => stringify(binary);
export const toBinaryUuid = (uuid: string) => parse(uuid);
import dayjs from "dayjs";
import { db } from "../db";
import { env } from "../env";
import {randomString} from "../utils/randomString";

export const generateSession = async (user_id: Uint8Array<ArrayBufferLike>) => {
    const validUntil = dayjs.utc().add(Number(env.TOKEN_VALID_DAYS), 'days').toDate();

    const { id } = await db.sessions.create({
        data: {
            id: randomString(128),
            user_id,
        }
    });

    return { id, validUntil };
};
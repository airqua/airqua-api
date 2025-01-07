import {users} from "@prisma/client";
import {db} from "../db";
import {randomString} from "../utils/randomString";
import {makeRecoveryLink} from "../utils/makeRecoveryLink";

export const generateRecoveryLink = async (user: users) => {
    const recovery = await db.codes.create({
        data: {
            id: randomString(32),
            type: 'recovery',
            user_id: user.id
        }
    });

    return makeRecoveryLink(recovery.id);
}
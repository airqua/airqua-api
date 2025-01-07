import {users} from "@prisma/client";
import {db} from "../db";
import {randomString} from "../utils/randomString";
import {makeVerificationLink} from "../utils/makeVerificationLink";

export const generateVerificationLink = async (user: users) => {
    const verification = await db.codes.create({
        data: {
            id: randomString(32),
            type: 'verification',
            user_id: user.id
        }
    });

    return makeVerificationLink(verification.id);
}
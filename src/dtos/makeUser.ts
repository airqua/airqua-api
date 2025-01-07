import {users} from "@prisma/client";
import {User} from "../types/domain/private";
import {fromBinaryUuid} from "../utils/uuid";
import dayjs from "dayjs";

export const makeUser = (user: users): User => ({
    id: fromBinaryUuid(user.id),
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    created_at: dayjs.utc(user.created_at).toISOString(),
    verified: user.verified
})
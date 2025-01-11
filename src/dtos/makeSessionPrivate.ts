import {Session} from "../types/domain/private";
import {sessions} from '@prisma/client';
import dayjs from "dayjs";

export const makeSessionPrivate = (session: sessions): Session => ({
    id: session.id.substring(0, 8),
    created_at: dayjs.utc(session.created_at).toISOString(),
    valid_until: dayjs.utc(session.valid_until).toISOString(),
})
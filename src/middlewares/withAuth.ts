import {RouteGenericInterface} from "fastify";
import {CustomRouteHandlerMethod} from "../types/CustomRouteHandlerMethod";
import {AddParameters} from "../types/AddParameters";
import {UnauthError} from "../errors/UnauthError";
import dayjs from "dayjs";
import {db} from "../db";
import {sessions, users} from '@prisma/client';

type OptionalReturn = { user: users | null, session: sessions | null };
type NotOptionalReturn = { user: users, session: sessions };

const validateSession = async <Optional extends boolean>(
    session?: string,
    optional?: Optional
): Promise<Optional extends true ? OptionalReturn : NotOptionalReturn> => {
    if (!session) {
        if (optional) {
            return { user: null, session: null } as Optional extends true ? OptionalReturn : NotOptionalReturn;
        }
        throw new UnauthError();
    }

    try {
        const sessionEntity = await db.sessions.findFirstOrThrow({
            where: { id: session },
            include: { users: true }
        });

        const { valid_until, users } = sessionEntity;

        if (dayjs.utc().isAfter(dayjs.utc(valid_until))) {
            await db.sessions.delete({ where: { id: session } });
            throw new UnauthError();
        }

        return { user: users, session: sessionEntity } as any as Optional extends true ? OptionalReturn : NotOptionalReturn;
    } catch {
        if (optional) {
            return { user: null, session: null } as Optional extends true ? OptionalReturn : NotOptionalReturn;
        }
        throw new UnauthError();
    }
};

export function withAuth<
    T extends RouteGenericInterface,
    Optional extends boolean = false
>(
    routeFunc: AddParameters<
        CustomRouteHandlerMethod<T>,
        [
            user: Optional extends true ? users | null : users,
            session: Optional extends true ? sessions | null : sessions
        ]
    >,
    optional?: Optional
): CustomRouteHandlerMethod<T> {
    return async function(req, resp) {
        const { user, session } = await validateSession(req.cookies.sessionId, optional);
        await routeFunc.call(this, req, resp, user, session);
    } as CustomRouteHandlerMethod<T>;
}
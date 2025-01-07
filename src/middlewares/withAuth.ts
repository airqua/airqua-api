import {RouteGenericInterface} from "fastify";
import {CustomRouteHandlerMethod} from "../types/CustomRouteHandlerMethod";
import {AddParameters} from "../types/AddParameters";
import {UnauthError} from "../errors/UnauthError";
import dayjs from "dayjs";
import {db} from "../db";
import { users } from '@prisma/client';

const validateSession = async <Optional extends boolean>(
    session?: string,
    optional?: Optional
): Promise<Optional extends true ? users | null : users> => {
    if (!session) {
        if (optional) {
            return null as Optional extends true ? users | null : users;
        }
        throw new UnauthError();
    }

    try {
        const { valid_until, users } = await db.sessions.findFirstOrThrow({
            where: { id: session },
            include: { users: true }
        });
        if (dayjs.utc().isAfter(dayjs.utc(valid_until))) {
            await db.sessions.delete({ where: { id: session } });
            throw new UnauthError();
        }
        return users as Optional extends true ? users | null : users;
    } catch {
        if (optional) {
            return null as Optional extends true ? users | null : users;
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
        [user: Optional extends true ? users | null : users]
    >,
    optional?: Optional
): CustomRouteHandlerMethod<T> {
    return async function(req, resp) {
        const user = await validateSession(req.cookies.sessionId, optional);
        await routeFunc.call(this, req, resp, user);
    } as CustomRouteHandlerMethod<T>;
}
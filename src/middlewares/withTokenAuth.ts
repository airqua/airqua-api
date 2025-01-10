import {RouteGenericInterface} from "fastify";
import {CustomRouteHandlerMethod} from "../types/CustomRouteHandlerMethod";
import {AddParameters} from "../types/AddParameters";
import {UnauthError} from "../errors/UnauthError";
import {db} from "../db";
import { users } from '@prisma/client';

const validateToken = async <Optional extends boolean>(
    token?: string,
    optional?: Optional
): Promise<Optional extends true ? users | null : users> => {
    if (!token) {
        if (optional) {
            return null as Optional extends true ? users | null : users;
        }
        throw new UnauthError();
    }

    try {
        const user = await db.users.findFirstOrThrow({
            where: { token }
        })
        return user as Optional extends true ? users | null : users;
    } catch {
        if (optional) {
            return null as Optional extends true ? users | null : users;
        }
        throw new UnauthError();
    }
};

export function withTokenAuth<
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
        const token = req.headers.authorization?.split(' ')[1];
        const user = await validateToken(token, optional);
        await routeFunc.call(this, req, resp, user);
    } as CustomRouteHandlerMethod<T>;
}
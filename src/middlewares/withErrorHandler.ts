import { FastifyReply, RouteGenericInterface } from "fastify";
import {isBadRequestError} from "../errors/BadRequestError";
import {isUnauthError} from "../errors/UnauthError";
import {isForbidError} from "../errors/ForbidError";
import {isNotFoundError} from "../errors/NotFoundError";
import {CustomRouteHandlerMethod} from "../types/CustomRouteHandlerMethod";
import {error} from "../utils/responses";
import {isInternalError} from "../errors/InternalError";

const handleErrors = (resp: FastifyReply, e: unknown) => {
    if(isBadRequestError(e)) {
        return resp.code(400).send(error(400, e.payload));
    }

    if(isUnauthError(e)) {
        return resp.code(401).send(error(401, e.payload));
    }

    if(isForbidError(e)) {
        return resp.code(403).send(error(403, e.payload));
    }

    if(isNotFoundError(e)) {
        return resp.code(404).send(error(404, e.payload));
    }

    if(isInternalError(e)) {
        return resp.code(500).send(error(500, e.payload));
    }

    console.error(e);
    return resp.code(500).send(error(500));
}

export function withErrorHandler<T extends RouteGenericInterface>(
    routeFunc: CustomRouteHandlerMethod<T>,
    customErrorHandler?: (resp: FastifyReply, e: unknown) => unknown): CustomRouteHandlerMethod<T> {
    return async function (req, resp) {
        try {
            await routeFunc.call(this, req, resp);
        } catch (e) {
            if(customErrorHandler) {
                console.error(e);
                return customErrorHandler(resp, e);
            }
            return handleErrors(resp, e);
        }
    } as CustomRouteHandlerMethod<T>;
}
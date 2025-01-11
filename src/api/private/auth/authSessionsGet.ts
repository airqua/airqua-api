import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {withAuth} from "../../../middlewares/withAuth";
import {db} from "../../../db";
import {Session} from "../../../types/domain/private";
import {makeSessionPrivate} from "../../../dtos/makeSessionPrivate";
import {ok} from "../../../utils/responses";

export const authSessionsGet: Route = (f) =>
    f.get('/sessions', withErrorHandler(withAuth(async (_, resp, user) => {
        const sessions = await db.sessions.findMany({
            where: { user_id: user.id }
        });

        return resp.code(200).send(ok<Session[]>(sessions.map(makeSessionPrivate)));
    })))
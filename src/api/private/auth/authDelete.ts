import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {withAuth} from "../../../middlewares/withAuth";
import {db} from "../../../db";
import {ok} from "../../../utils/responses";

export const authDelete: Route = (f) =>
    f.delete('/', withErrorHandler(withAuth(async (req, resp) => {
        await db.sessions.delete({ where: { id: req.cookies.sessionId }});
        return resp.code(200).send(ok());
    })))
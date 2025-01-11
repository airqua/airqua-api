import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {withAuth} from "../../../middlewares/withAuth";
import {db} from "../../../db";
import {ok} from "../../../utils/responses";

export const authSessionsDelete: Route = (f) =>
    f.delete('/sessions', withErrorHandler(withAuth(async (req, resp, user, session) => {
        await db.sessions.deleteMany({
            where: {
                AND: [
                    { user_id: user.id },
                    { NOT: { id: session } }
                ]
            }
        });

        return resp.code(200).send(ok());
    })))
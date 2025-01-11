import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {withAuth} from "../../../middlewares/withAuth";
import {db} from "../../../db";
import {ok} from "../../../utils/responses";

export const accountDelete: Route = (f) =>
    f.delete('/', withErrorHandler(withAuth(async (_, resp, user) => {
        await db.users.delete({ where: { id: user.id } });

        return resp.code(200).send(ok());
    })))
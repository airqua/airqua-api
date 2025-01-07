import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {withAuth} from "../../../middlewares/withAuth";
import {ok} from "../../../utils/responses";
import {makeUser} from "../../../dtos/makeUser";
import {User} from "../../../types/domain/private";

export const authGet: Route = (f) =>
    f.get('/', withErrorHandler(withAuth(async (req, resp, user) => {
        return resp.code(200).send(ok<User>(makeUser(user)));
    })))
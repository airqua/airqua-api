import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {withAuth} from "../../../middlewares/withAuth";
import {ok} from "../../../utils/responses";
import {Token} from "../../../types/domain/private";

export const authTokenGet: Route = (f) =>
    f.get('/token', withErrorHandler(withAuth(async (_, resp, user) => {
        return resp.code(200).send(ok<Token>({ token: user.token }));
    })))
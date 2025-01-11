import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {withAuth} from "../../../middlewares/withAuth";
import {db} from "../../../db";
import {randomString} from "../../../utils/randomString";
import {ok} from "../../../utils/responses";
import {Token} from "../../../types/domain/private";

export const accountTokenPut: Route = (f) =>
    f.put('/token', withErrorHandler(withAuth(async (_, resp, user) =>{
        const updatedUser = await db.users.update({
            where: { id: user.id },
            data: { token: randomString(64) }
        });

        return resp.code(200).send(ok<Token>({ token: updatedUser.token }));
    })))
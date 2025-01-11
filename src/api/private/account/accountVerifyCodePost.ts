import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {getAndValidateCode} from "../../../modules/getAndValidateCode";
import {NotFoundError} from "../../../errors/NotFoundError";
import {db} from "../../../db";
import {ok} from "../../../utils/responses";


type RouteType = { Params: { code: string } };

export const accountVerifyCodePost: Route = (f) =>
    f.post<RouteType>('/verify/:code', withErrorHandler(async (req, resp) => {
        const { code } = req.params;

        const codeEntity = await getAndValidateCode(code);
        if(!codeEntity) throw new NotFoundError();

        await db.users.update({ where: { id: codeEntity.user_id }, data: { verified: true } });
        await db.codes.delete({ where: { id: code } });

        return resp.code(200).send(ok());
    }))
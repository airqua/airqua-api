import {Route} from "../../../../types/routes";
import {withErrorHandler} from "../../../../middlewares/withErrorHandler";
import {RecoverCodePost} from "../../../../types/domain/private";
import {db} from "../../../../db";
import {NotFoundError} from "../../../../errors/NotFoundError";
import bcrypt from 'bcrypt';
import {ok} from "../../../../utils/responses";
import {getAndValidateCode} from "../../../../modules/getAndValidateCode";

type RouteType = { Params: { code: string }, Body: RecoverCodePost };

export const authRecoverCodePost: Route = (f) =>
    f.post<RouteType>('/recover/:code', withErrorHandler(async (req, resp) => {
        const { code } = req.params;
        const { password } = req.body;

        const codeEntity = await getAndValidateCode(code);
        if(!codeEntity) throw new NotFoundError();

        await db.users.update({
            where: { id: codeEntity.user_id },
            data: { password: await bcrypt.hash(password, 12) }
        });
        await db.sessions.deleteMany({
            where: { user_id: codeEntity.user_id }
        });
        await db.codes.delete({ where: { id: code } });

        return resp.code(200).send(ok());
    }))
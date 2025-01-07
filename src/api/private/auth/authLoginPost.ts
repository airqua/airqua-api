import bcrypt from 'bcrypt';
import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {LoginPost} from "../../../types/domain/private";
import {db} from "../../../db";
import {NotFoundError} from "../../../errors/NotFoundError";
import {generateSession} from "../../../modules/generateSession";
import {ok} from "../../../utils/responses";

type RequestType = { Body: LoginPost };

export const authLoginPost: Route = (f) =>
    f.post<RequestType>('/login', withErrorHandler(async (req, resp) => {
        const { email, password } = req.body;

        const user = await db.users.findFirst({ where: { email } });
        if(!user) {
            throw new NotFoundError();
        }

        if(!await bcrypt.compare(password, user.password)) {
            throw new NotFoundError();
        }

        const { id, validUntil } = await generateSession(user.id);
        return resp.setCookie('sessionId', id, { expires: validUntil }).code(200).send(ok());
    }));
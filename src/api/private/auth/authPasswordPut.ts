import bcrypt from 'bcrypt';
import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {withAuth} from "../../../middlewares/withAuth";
import {PasswordPut} from "../../../types/domain/private";
import {BadRequestError} from "../../../errors/BadRequestError";
import {db} from "../../../db";
import {ok} from "../../../utils/responses";

type RouteType = { Body: PasswordPut };

export const authPasswordPut: Route = (f) =>
    f.put<RouteType>('/password', withErrorHandler(withAuth(async (req, resp, user) => {
        const { password, old_password } = req.body;

        if(!await bcrypt.compare(user.password, old_password)) {
            throw new BadRequestError();
        }

        await db.users.update({
            where: { id: user.id },
            data: { password: await bcrypt.hash(password, 12) }
        });

        await db.sessions.deleteMany({
            where: { user_id: user.id }
        });

        return resp.code(200).send(ok());
    })))
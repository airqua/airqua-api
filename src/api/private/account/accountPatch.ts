import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {withAuth} from "../../../middlewares/withAuth";
import {AccountPatch} from "../../../types/domain/private";
import bcrypt from "bcrypt";
import {BadRequestError} from "../../../errors/BadRequestError";
import {db} from "../../../db";
import {ok} from "../../../utils/responses";

type RouteType = { Body: AccountPatch };

export const accountPatch: Route = (f) =>
    f.patch<RouteType>('/', withErrorHandler(withAuth(async (req, resp, user) => {
        const { old_password, first_name, last_name, email, password } = req.body;

        if(!await bcrypt.compare(user.password, old_password)) {
            throw new BadRequestError();
        }

        await db.users.update({
            where: { id: user.id },
            data: {
                first_name: first_name || undefined,
                last_name: last_name || undefined,
                email: email || undefined,
                password: password ? await bcrypt.hash(password, 12) : undefined,
                verified: email ? false : undefined
            }
        });

        if(password) {
            await db.sessions.deleteMany({
                where: { user_id: user.id }
            });
        }

        return resp.code(200).send(ok());
    })))
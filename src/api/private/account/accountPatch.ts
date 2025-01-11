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
        const { old_password, ...rest } = req.body;

        if(!await bcrypt.compare(user.password, old_password)) {
            throw new BadRequestError();
        }

        await db.users.update({
            where: { id: user.id },
            data: {
                ...rest,
                password: rest.password ? await bcrypt.hash(rest.password, 12) : undefined
            }
        });

        if(rest.password) {
            await db.sessions.deleteMany({
                where: { user_id: user.id }
            });
        }

        return resp.code(200).send(ok());
    })))
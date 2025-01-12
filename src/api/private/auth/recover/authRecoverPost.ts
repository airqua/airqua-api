import {Route} from "../../../../types/routes";
import {withErrorHandler} from "../../../../middlewares/withErrorHandler";
import {RecoverPost} from "../../../../types/domain/private";
import {db} from "../../../../db";
import {ok} from "../../../../utils/responses";
import {sendRecoverEmail} from "../../../../modules/mail";
import {generateRecoveryLink} from "../../../../modules/generateRecoveryLink";
import {InternalError} from "../../../../errors/InternalError";
import {verifyRecaptcha} from "../../../../modules/verifyRecaptcha";
import {BadRequestError} from "../../../../errors/BadRequestError";

type RouteType = { Body: RecoverPost };

export const authRecoverPost: Route = (f) =>
    f.post<RouteType>('/recover', withErrorHandler(async (req, resp) => {
        const { email, recaptcha } = req.body;

        if(!await verifyRecaptcha(recaptcha))  {
            throw new BadRequestError();
        }

        const user = await db.users.findFirst({ where: { email } });
        if(!user) {
            return resp.code(200).send(ok());
        }

        try {
            await sendRecoverEmail(email, user.first_name, await generateRecoveryLink(user));
            return resp.code(200).send(ok());
        } catch(err) {
            console.error('ERROR SENDING RECOVER EMAIL', err);
            throw new InternalError();
        }
    }))
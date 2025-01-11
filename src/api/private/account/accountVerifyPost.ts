import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {withAuth} from "../../../middlewares/withAuth";
import {sendVerifyEmail} from "../../../modules/mail";
import {db} from "../../../db";
import {generateVerificationLink} from "../../../modules/generateVerificationLink";
import {ok} from "../../../utils/responses";
import {InternalError} from "../../../errors/InternalError";
import dayjs from "dayjs";
import {BadRequestError} from "../../../errors/BadRequestError";

export const accountVerifyPost: Route = (f) =>
    f.post('/verify', withErrorHandler(withAuth(async (_, resp, user) => {
        const codes = await db.codes.findMany({
            where: {
                user_id: user.id,
                type: 'verification',
            }
        });

        if(!codes.length) {
            try {
                await sendVerifyEmail(user.email, user.first_name, await generateVerificationLink(user));
                return resp.code(200).send(ok());
            } catch (err) {
                console.error('ERROR SENDING VERIFICATION EMAIL', err);
                throw new InternalError();
            }
        }

        // remove old codes
        const now = dayjs.utc();
        const invalidCodes = codes.filter((v) => !dayjs.utc(v.valid_until).isAfter(now));
        if(invalidCodes.length) {
            await db.codes.deleteMany({
                where: {
                    id: { in: invalidCodes.map(({ id }) => id) }
                }
            })
        }

        const validCodes = codes.filter((v) => dayjs.utc(v.valid_until).isAfter(now));
        if(validCodes.length) {
            throw new BadRequestError();
        }

        try {
            await sendVerifyEmail(user.email, user.first_name, await generateVerificationLink(user));
            return resp.code(200).send(ok());
        } catch (err) {
            console.error('ERROR SENDING VERIFICATION EMAIL', err);
            throw new InternalError();
        }
    })))
import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {SignupPost} from "../../../types/domain/private";
import {db} from "../../../db";
import {ok} from "../../../utils/responses";
import bcrypt from 'bcrypt';
import {sendAlreadyRegisteredEmail, sendVerifyEmail} from "../../../modules/mail";
import {generateVerificationLink} from "../../../modules/generateVerificationLink";
import {makeUuid} from "../../../utils/uuid";
import {randomString} from "../../../utils/randomString";

type RouteType = { Body: SignupPost };

export const authSignupPost: Route = (f) =>
    f.post<RouteType>('/signup', withErrorHandler(async (req, resp) => {
        const { first_name, last_name, email, password } = req.body;

        const existingUser = await db.users.findFirst({ where: { email } });
        if(existingUser) {
            try {
                await sendAlreadyRegisteredEmail(email, existingUser.first_name); // send to users name and not inputted name
            } catch (err) {
                console.error('ERROR SENDING ALREADY EMAIL', err);
            }
            return resp.code(200).send(ok());
        }

        const user = await db.users.create({
            data: {
                id: makeUuid(),
                first_name,
                last_name,
                email,
                password: await bcrypt.hash(password, 12),
                token: randomString(128)
            }
        });

        try {
            await sendVerifyEmail(email, first_name, await generateVerificationLink(user));
        } catch (err) {
            console.error('ERROR SENDING VERIFICATION EMAIL', err);
        }

        return resp.code(200).send(ok());
    }))
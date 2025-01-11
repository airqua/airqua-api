import {makeRoutes} from "../../../utils/makeRoutes";
import {authGet} from "./authGet";
import {authDelete} from "./authDelete";
import {authLoginPost} from "./authLoginPost";
import {authSignupPost} from "./authSignupPost";
import {authRecoverPost} from "./recover/authRecoverPost";
import {authRecoverCodePost} from "./recover/authRecoverCodePost";
import {authSessionsGet} from "./sessions/authSessionsGet";
import {authSessionsDelete} from "./sessions/authSessionsDelete";

export const privateAuthHandler = makeRoutes((fastify) => {
    // GET /auth
    authGet(fastify);

    // DELETE /auth
    authDelete(fastify);

    // POST /auth/login
    authLoginPost(fastify);

    // POST /auth/signup
    authSignupPost(fastify);

    // POST /auth/recover
    authRecoverPost(fastify);

    // POST /auth/recover/{code}
    authRecoverCodePost(fastify);

    // GET /auth/sessions
    authSessionsGet(fastify);

    // DELETE /auth/sessions
    authSessionsDelete(fastify);
})
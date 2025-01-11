import {makeRoutes} from "../../../utils/makeRoutes";
import {authGet} from "./authGet";
import {authDelete} from "./authDelete";
import {authLoginPost} from "./authLoginPost";
import {authSignupPost} from "./authSignupPost";
import {authRecoverPost} from "./authRecoverPost";
import {authRecoverCodePost} from "./authRecoverCodePost";
import {authVerifyCodePost} from "./authVerifyCodePost";
import {authPasswordPut} from "./authPasswordPut";
import {authSessionsGet} from "./authSessionsGet";
import {authSessionsDelete} from "./authSessionsDelete";
import {authTokenGet} from "./authTokenGet";
import {authTokenPut} from "./authTokenPut";

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

    // POST /auth/verify/{code}
    authVerifyCodePost(fastify);

    // PUT /auth/password
    authPasswordPut(fastify);

    // GET /auth/sessions
    authSessionsGet(fastify);

    // DELETE /auth/sessions
    authSessionsDelete(fastify);

    // GET /auth/token
    authTokenGet(fastify);

    // PUT /auth/token
    authTokenPut(fastify);
})
import {makeRoutes} from "../../../utils/makeRoutes";
import {authGet} from "./authGet";
import {authDelete} from "./authDelete";
import {authLoginPost} from "./authLoginPost";
import {authSignupPost} from "./authSignupPost";
import {authPasswordPut} from "./authPasswordPut";
import {authRecoverPost} from "./recover/authRecoverPost";
import {authRecoverCodePost} from "./recover/authRecoverCodePost";
import {authVerifyCodePost} from "./verify/authVerifyCodePost";
import {authSessionsGet} from "./sessions/authSessionsGet";
import {authSessionsDelete} from "./sessions/authSessionsDelete";
import {authTokenGet} from "./token/authTokenGet";
import {authTokenPut} from "./token/authTokenPut";
import {authVerifyPost} from "./verify/authVerifyPost";

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

    // POST /auth/verify
    authVerifyPost(fastify);

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
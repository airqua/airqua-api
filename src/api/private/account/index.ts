import {makeRoutes} from "../../../utils/makeRoutes";
import {accountDelete} from "./accountDelete";
import {accountVerifyCodePost} from "./accountVerifyCodePost";
import {accountVerifyPost} from "./accountVerifyPost";
import {accountTokenGet} from "./accountTokenGet";
import {accountTokenPut} from "./accountTokenPut";
import {accountPatch} from "./accountPatch";

export const privateAccountHandler = makeRoutes((fastify) => {
    // DELETE /account
    accountDelete(fastify);

    // PATCH /account
    accountPatch(fastify);

    // POST /account/verify
    accountVerifyPost(fastify);

    // POST /account/verify/{code}
    accountVerifyCodePost(fastify);

    // GET /account/token
    accountTokenGet(fastify);

    // PUT /account/token
    accountTokenPut(fastify);
})
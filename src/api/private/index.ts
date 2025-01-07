import {makeRoutes} from "../../utils/makeRoutes";
import {privateAuthHandler} from "./auth";

export const privateHandler = makeRoutes((fastify) => {
   fastify.register(privateAuthHandler, { prefix: '/auth' });
})
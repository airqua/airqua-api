import {makeRoutes} from "../../utils/makeRoutes";
import {privateAuthHandler} from "./auth";
import {privateSensorsHandler} from "./sensors";

export const privateHandler = makeRoutes((fastify) => {
   fastify.register(privateAuthHandler, { prefix: '/auth' });
   fastify.register(privateSensorsHandler, { prefix: '/sensors' });
})
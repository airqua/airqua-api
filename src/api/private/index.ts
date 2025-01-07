import {makeRoutes} from "../../utils/makeRoutes";
import {privateAuthHandler} from "./auth";
import {privateSensorsHandler} from "./sensors";
import {privateMetricsHandler} from "./metrics";

export const privateHandler = makeRoutes((fastify) => {
   fastify.register(privateAuthHandler, { prefix: '/auth' });
   fastify.register(privateSensorsHandler, { prefix: '/sensors' });
   fastify.register(privateMetricsHandler, { prefix: '/metrics' });
})
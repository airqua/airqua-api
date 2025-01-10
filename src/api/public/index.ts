import {makeRoutes} from "../../utils/makeRoutes";
import {publicSensorsHandler} from "./sensors";
import {publicMetricsHandler} from "./metrics";

export const publicHandler = makeRoutes((fastify) => {
    fastify.register(publicSensorsHandler, { prefix: '/sensors' });
    fastify.register(publicMetricsHandler, { prefix: '/metrics' });
})
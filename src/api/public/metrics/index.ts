import {makeRoutes} from "../../../utils/makeRoutes";
import {metricsGet} from "./metricsGet";

export const publicMetricsHandler = makeRoutes((fastify) => {
    // GET /metrics
    metricsGet(fastify);
})
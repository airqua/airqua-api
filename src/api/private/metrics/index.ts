import {makeRoutes} from "../../../utils/makeRoutes";
import {metricsGet} from "./metricsGet";

export const privateMetricsHandler = makeRoutes((fastify) => {
    // GET /metrics
    metricsGet(fastify);
})
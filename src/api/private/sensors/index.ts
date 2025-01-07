import {makeRoutes} from "../../../utils/makeRoutes";
import {sensorsGet} from "./sensorsGet";
import {sensorsPost} from "./sensorsPost";
import {sensorsOwnGet} from "./sensorsOwnGet";
import {sensorsSensorIdReadingsGet} from "./readings/sensorsSensorIdReadingsGet";

export const privateSensorsHandler = makeRoutes((fastify) => {
    // GET /sensors
    sensorsGet(fastify);

    // POST /sensors
    sensorsPost(fastify);

    // GET /sensors/own
    sensorsOwnGet(fastify);

    // GET /sensors/{sensorId}/readings
    sensorsSensorIdReadingsGet(fastify);
})
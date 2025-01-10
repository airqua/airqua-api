import {makeRoutes} from "../../../utils/makeRoutes";
import {sensorsGet} from "./sensorsGet";
import {sensorsSensorIdReadingsGet} from "./readings/sensorsSensorIdReadingsGet";
import {sensorsSensorIdReadingsPost} from "./readings/sensorsSensorIdReadingsPost";

export const publicSensorsHandler = makeRoutes((fastify) => {
    // GET /sensors
    sensorsGet(fastify);

    // GET /sensors/{sensorId}/readings
    sensorsSensorIdReadingsGet(fastify);

    // POST /sensors/{sensorId}/readings
    sensorsSensorIdReadingsPost(fastify);
})
import {makeRoutes} from "../../../utils/makeRoutes";
import {sensorsGet} from "./sensorsGet";
import {sensorsPost} from "./sensorsPost";
import {sensorsOwnGet} from "./sensorsOwnGet";
import {sensorsSensorIdReadingsGet} from "./readings/sensorsSensorIdReadingsGet";
import {sensorsSensorIdDelete} from "./sensorsSensorIdDelete";
import {sensorsSensorIdPatch} from "./sensorsSensorIdPatch";
import {sensorsSensorIdVisiblePut} from "./sensorsSensorIdVisiblePut";

export const privateSensorsHandler = makeRoutes((fastify) => {
    // GET /sensors
    sensorsGet(fastify);

    // POST /sensors
    sensorsPost(fastify);

    // GET /sensors/own
    sensorsOwnGet(fastify);

    // PATCH /sensors/{sensorId}
    sensorsSensorIdPatch(fastify);

    // DELETE /sensors/{sensorId}
    sensorsSensorIdDelete(fastify);

    // PUT /sensors/{sensorId}/visible
    sensorsSensorIdVisiblePut(fastify);

    // GET /sensors/{sensorId}/readings
    sensorsSensorIdReadingsGet(fastify);
})
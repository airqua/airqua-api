import {makeRoutes} from "../../../utils/makeRoutes";
import {sensorsGet} from "./sensorsGet";
import {sensorsPost} from "./sensorsPost";
import {sensorsOwnGet} from "./sensorsOwnGet";
import {sensorsSensorIdReadingsGet} from "./readings/sensorsSensorIdReadingsGet";
import {sensorsSensorIdDelete} from "./sensorsSensorIdDelete";
import {sensorsSensorIdPatch} from "./sensorsSensorIdPatch";
import {sensorsSensorIdVisiblePut} from "./sensorsSensorIdVisiblePut";
import {sensorsUnapprovedGet} from "./sensorsUnapprovedGet";
import {sensorsSensorIdApprovePut} from "./sensorsSensorIdApprovePut";

export const privateSensorsHandler = makeRoutes((fastify) => {
    // GET /sensors
    sensorsGet(fastify);

    // POST /sensors
    sensorsPost(fastify);

    // GET /sensors/own
    sensorsOwnGet(fastify);

    // GET /sensors/unapproved
    sensorsUnapprovedGet(fastify);

    // PATCH /sensors/{sensorId}
    sensorsSensorIdPatch(fastify);

    // DELETE /sensors/{sensorId}
    sensorsSensorIdDelete(fastify);

    // PUT /sensors/{sensorId}/visible
    sensorsSensorIdVisiblePut(fastify);

    // PUT /sensors/{sensorId}/approve
    sensorsSensorIdApprovePut(fastify);

    // GET /sensors/{sensorId}/readings
    sensorsSensorIdReadingsGet(fastify);
})
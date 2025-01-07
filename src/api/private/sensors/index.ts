import {makeRoutes} from "../../../utils/makeRoutes";
import {sensorsGet} from "./sensorsGet";
import {sensorsPost} from "./sensorsPost";
import {sensorsOwnGet} from "./sensorsOwnGet";

export const privateSensorsHandler = makeRoutes((fastify) => {
    // GET /sensors
    sensorsGet(fastify);

    // POST /sensors
    sensorsPost(fastify);

    // GET /sensors/own
    sensorsOwnGet(fastify);
})
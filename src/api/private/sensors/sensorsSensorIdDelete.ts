import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {withAuth} from "../../../middlewares/withAuth";
import {db} from "../../../db";
import {toBinaryUuid} from "../../../utils/uuid";
import {ForbidError} from "../../../errors/ForbidError";
import {ok} from "../../../utils/responses";

type RouteType = { Params: { sensorId: string } };

export const sensorsSensorIdDelete: Route = (f) =>
    f.delete<RouteType>('/:sensorId', withErrorHandler(withAuth(async (req, resp, user) => {
        const { sensorId } = req.params;

        if(!await db.sensors.findFirst({ where: { id: toBinaryUuid(sensorId), created_by: user.id } })) {
            throw new ForbidError();
        }

        await db.sensors.delete({ where: { id: toBinaryUuid(sensorId) } });

        return resp.code(200).send(ok());
    })))
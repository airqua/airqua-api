import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {withAuth} from "../../../middlewares/withAuth";
import {SensorVisiblePut} from "../../../types/domain/private";
import {db} from "../../../db";
import {toBinaryUuid} from "../../../utils/uuid";
import {ForbidError} from "../../../errors/ForbidError";
import {ok} from "../../../utils/responses";

type RouteType = { Params: { sensorId: string }, Body: SensorVisiblePut };

export const sensorsSensorIdVisiblePut: Route = (f) =>
    f.put<RouteType>('/:sensorId/visible', withErrorHandler(withAuth(async (req, resp, user) => {
        const { sensorId } = req.params;
        const { visible } = req.body;

        if(!await db.sensors.findFirst({ where: { id: toBinaryUuid(sensorId), created_by: user.id } })) {
            throw new ForbidError();
        }

        await db.sensors.update({
            where: { id: toBinaryUuid(sensorId) },
            data: { visible }
        });

        return resp.code(200).send(ok());
    })))
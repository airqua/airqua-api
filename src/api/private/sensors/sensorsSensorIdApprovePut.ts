import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import { withAuth } from "../../../middlewares/withAuth";
import {ForbidError} from "../../../errors/ForbidError";
import {SensorApprovePut} from "../../../types/domain/private";
import {db} from "../../../db";
import {toBinaryUuid} from "../../../utils/uuid";
import {ok} from "../../../utils/responses";

type RouteType = { Params: { sensorId: string }, Body: SensorApprovePut };

export const sensorsSensorIdApprovePut: Route = (f) =>
    f.put<RouteType>('/:sensorId/visible', withErrorHandler(withAuth(async (req, resp, user) => {
        if(!user.admin) throw new ForbidError();

        const { sensorId } = req.params;
        const { approved } = req.body;

        await db.sensors.update({
            where: { id: toBinaryUuid(sensorId) },
            data: { approved }
        });

        return resp.code(200).send(ok());
    })))
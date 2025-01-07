import {Route} from "../../../../types/routes";
import {withErrorHandler} from "../../../../middlewares/withErrorHandler";
import {db} from "../../../../db";
import {toBinaryUuid} from "../../../../utils/uuid";
import {ok} from "../../../../utils/responses";
import {SensorReading} from "../../../../types/domain/private";
import {makeReadingPrivate} from "../../../../dtos/makeReadingPrivate";

type RouteType = { Params: { sensorId: string } };

export const sensorsSensorIdReadingsGet: Route = (f) =>
    f.get<RouteType>('/:sensorId/readings', withErrorHandler(async (req, resp) => {
        const { sensorId } = req.params;

        const readings = await db.readings.findMany({
            where: { sensor_id: toBinaryUuid(sensorId) },
            include: {
                readings_values: {
                    include: {
                        metrics: true
                    }
                }
            }
        })

        return resp.code(200).send(ok<SensorReading[]>(readings.map(makeReadingPrivate)));
    }))
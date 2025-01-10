import {Route} from "../../../../types/routes";
import {withErrorHandler} from "../../../../middlewares/withErrorHandler";
import {withTokenAuth} from "../../../../middlewares/withTokenAuth";
import {SensorReading, SensorReadingPost} from "../../../../types/domain/public";
import {BadRequestError} from "../../../../errors/BadRequestError";
import {db} from "../../../../db";
import {makeUuid, toBinaryUuid} from "../../../../utils/uuid";
import {ForbidError} from "../../../../errors/ForbidError";
import {ok} from "../../../../utils/responses";
import {makeReadingPublic} from "../../../../dtos/public/makeReadingPublic";

type RouteType = { Params: { sensorId: string }, Body: SensorReadingPost[] };

export const sensorsSensorIdReadingsPost: Route = (f) =>
    f.post<RouteType>('/:sensorId/readings', withErrorHandler(withTokenAuth(async (req, resp, user) => {
        if(!req.body.length) throw new BadRequestError();

        if(!await db.sensors.findFirst({
            where: {
                id: toBinaryUuid(req.params.sensorId),
                created_by: user.id,
            }
        })) throw new ForbidError();

        const reading = await db.readings.create({
            data: {
                id: makeUuid(),
                sensor_id: toBinaryUuid(req.params.sensorId),
                readings_values: {
                    create: req.body.map(({ metric_id, value }) => ({
                        id: makeUuid(),
                        metric_id,
                        value
                    }))
                }
            },
            include: {
                readings_values: {
                    include: {
                        metrics: true
                    }
                }
            }
        });

        return resp.code(200).send(ok<SensorReading>(makeReadingPublic(reading)));
    })))
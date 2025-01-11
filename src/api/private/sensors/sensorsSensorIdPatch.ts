import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {withAuth} from "../../../middlewares/withAuth";
import {Sensor, SensorPatch} from "../../../types/domain/private";
import {db} from "../../../db";
import {toBinaryUuid} from "../../../utils/uuid";
import {ForbidError} from "../../../errors/ForbidError";
import {ok} from "../../../utils/responses";
import {makeSensorOwnPrivate} from "../../../dtos/makeSensorOwnPrivate";

type RouteType = { Params: { sensorId: string }, Body: SensorPatch };

export const sensorsSensorIdPatch: Route = (f) =>
    f.patch<RouteType>('/:sensorId', withErrorHandler(withAuth(async (req, resp, user) => {
        const { sensorId } = req.params;
        const { coordinates, address } = req.body;

        if(!await db.sensors.findFirst({ where: { id: toBinaryUuid(sensorId), created_by: user.id } })) {
            throw new ForbidError();
        }

        const sensor = await db.sensors.update({
            where: { id: toBinaryUuid(sensorId) },
            data: {
                lat: coordinates?.lat || undefined,
                lng: coordinates?.lng || undefined,
                street: address?.street || undefined,
                city: address?.city || undefined,
            },
            include: {
                readings: {
                    orderBy: {
                        created_at: 'desc'
                    },
                    include: {
                        readings_values: {
                            include: {
                                metrics: true
                            }
                        }
                    }
                }
            }
        });

        return resp.code(200).send(ok<Sensor>(makeSensorOwnPrivate(sensor)));
    })))
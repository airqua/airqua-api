import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {withAuth} from "../../../middlewares/withAuth";
import {Sensor, SensorPost} from "../../../types/domain/private";
import {db} from "../../../db";
import {ok} from "../../../utils/responses";
import {makeSensorPrivate} from "../../../dtos/makeSensorPrivate";

type RequestType = { Body: SensorPost };

export const sensorsPost: Route = (f) =>
    f.post<RequestType>('/', withErrorHandler(withAuth(async (req, resp, user) => {
        const { coordinates, address } = req.body;

        const sensor = await db.sensors.create({
            data: {
                lat: coordinates.lat,
                lng: coordinates.lng,
                street: address.street,
                city: address.city,
                created_by: user.id
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

        return resp.code(200).send(ok<Sensor>(makeSensorPrivate(sensor, user)));
    })))
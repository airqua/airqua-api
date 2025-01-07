import {Route} from "../../../types/routes";
import {withAuth} from "../../../middlewares/withAuth";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {db} from "../../../db";
import {ok} from "../../../utils/responses";
import {Sensor} from "../../../types/domain/private";
import {makeSensorPrivate} from "../../../dtos/makeSensorPrivate";

export const sensorsGet: Route = (f) =>
    f.get('/', withErrorHandler(withAuth(async (req, resp, user) => {
        const sensors = await db.sensors.findMany({
            where: user ? {
                OR: [
                    { visible: true, approved: true },
                    { created_by: user.id }
                ]
            } : {
                visible: true,
                approved: true
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

        return resp.code(200).send(ok<Sensor[]>(
            sensors.map((sensor) => makeSensorPrivate(sensor, user))
        ));
    }, true)));
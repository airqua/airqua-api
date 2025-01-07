import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {withAuth} from "../../../middlewares/withAuth";
import {db} from "../../../db";
import {ok} from "../../../utils/responses";
import {SensorOwn} from "../../../types/domain/private";
import {makeSensorOwnPrivate} from "../../../dtos/makeSensorOwnPrivate";

export const sensorsOwnGet: Route = (f) =>
    f.get('/own', withErrorHandler(withAuth(async (req, resp, user) => {
        const sensors = await db.sensors.findMany({
            where: { created_by: user.id },
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

        return resp.code(200).send(ok<SensorOwn[]>(sensors.map(makeSensorOwnPrivate)));
    })))
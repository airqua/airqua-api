import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {withAuth} from "../../../middlewares/withAuth";
import {db} from "../../../db";
import {ForbidError} from "../../../errors/ForbidError";
import {ok} from "../../../utils/responses";
import {Sensor} from "../../../types/domain/private";
import {makeSensorPrivate} from "../../../dtos/makeSensorPrivate";

export const sensorsUnapprovedGet: Route = (f) =>
    f.get('/unapproved', withErrorHandler(withAuth(async (req, resp, user) => {
        if(!user.admin) throw new ForbidError();

        const sensors = await db.sensors.findMany({
            where: { approved: false },
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
    })))
import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {db} from "../../../db";
import {ok} from "../../../utils/responses";
import {Sensor} from "../../../types/domain/public";
import {makeSensorPublic} from "../../../dtos/public/makeSensorPublic";

export const sensorsGet: Route = (f) =>
    f.get('/', withErrorHandler(async (req, resp) => {
        const sensors = await db.sensors.findMany({
            where: { visible: true, approved: true },
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

        return resp.code(200).send(ok<Sensor[]>(sensors.map(makeSensorPublic)));
    }))
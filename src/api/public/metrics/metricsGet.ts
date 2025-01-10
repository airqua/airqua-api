import {Route} from "../../../types/routes";
import {withErrorHandler} from "../../../middlewares/withErrorHandler";
import {db} from "../../../db";
import {ok} from "../../../utils/responses";
import {Metric} from "../../../types/domain/public";
import {makeMetricPublic} from "../../../dtos/public/makeMetricPublic";

export const metricsGet: Route = (f) =>
    f.get('/', withErrorHandler(async (_, resp) => {
        const metrics = await db.metrics.findMany();

        return resp.code(200).send(ok<Metric[]>(metrics.map(makeMetricPublic)));
    }))
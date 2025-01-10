import {Metric} from "../../types/domain/public";
import {metrics} from '@prisma/client';

export const makeMetricPublic = (metric: metrics): Metric => ({
    id: metric.id,
    name: metric.name,
    description: metric.description,
    max: metric.max,
    unit: metric.unit
})
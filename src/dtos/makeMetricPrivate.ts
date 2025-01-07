import {Metric} from "../types/domain/private";
import {metrics} from '@prisma/client';

export const makeMetricPrivate = (metric: metrics): Metric => ({
    id: metric.id,
    name: metric.name,
    description: metric.description,
    max: metric.max,
    unit: metric.unit
})
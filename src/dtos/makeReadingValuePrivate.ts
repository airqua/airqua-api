import {Prisma} from '@prisma/client';
import {SensorReadingValue} from "../types/domain/private";
import {fromBinaryUuid} from "../utils/uuid";
import {makeMetricPrivate} from "./makeMetricPrivate";

type ReadingValueEntity = Prisma.readings_valuesGetPayload<{
    include: {
        metrics: true
    }
}>

export const makeReadingValuePrivate = (readingValue: ReadingValueEntity): SensorReadingValue => ({
    id: fromBinaryUuid(readingValue.id),
    metric: makeMetricPrivate(readingValue.metrics),
    value: readingValue.value
})
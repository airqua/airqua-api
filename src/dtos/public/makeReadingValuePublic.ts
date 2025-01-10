import {Prisma} from "@prisma/client";
import {SensorReadingValue} from "../../types/domain/public";
import {fromBinaryUuid} from "../../utils/uuid";
import {makeMetricPublic} from "./makeMetricPublic";

type ReadingValueEntity = Prisma.readings_valuesGetPayload<{
    include: {
        metrics: true
    }
}>

export const makeReadingValuePublic = (readingValue: ReadingValueEntity): SensorReadingValue => ({
    id: fromBinaryUuid(readingValue.id),
    metric: makeMetricPublic(readingValue.metrics),
    value: readingValue.value
})
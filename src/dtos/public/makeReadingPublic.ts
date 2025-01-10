import {Prisma} from "@prisma/client";
import {SensorReading} from "../../types/domain/public";
import {fromBinaryUuid} from "../../utils/uuid";
import dayjs from "dayjs";
import {makeReadingValuePublic} from "./makeReadingValuePublic";

type ReadingEntity = Prisma.readingsGetPayload<{
    include: {
        readings_values: {
            include: {
                metrics: true
            }
        }
    }
}>

export const makeReadingPublic = (reading: ReadingEntity): SensorReading => ({
    id: fromBinaryUuid(reading.id),
    values: reading.readings_values.map(makeReadingValuePublic),
    created_at: dayjs.utc(reading.created_at).toISOString()
})
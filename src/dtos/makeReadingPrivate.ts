import {SensorReading} from "../types/domain/private";
import { Prisma } from '@prisma/client';
import {fromBinaryUuid} from "../utils/uuid";
import dayjs from "dayjs";
import {makeReadingValuePrivate} from "./makeReadingValuePrivate";

type ReadingEntity = Prisma.readingsGetPayload<{
    include: {
        readings_values: {
            include: {
                metrics: true
            }
        }
    }
}>

export const makeReadingPrivate = (reading: ReadingEntity): SensorReading => ({
    id: fromBinaryUuid(reading.id),
    values: reading.readings_values.map(makeReadingValuePrivate),
    created_at: dayjs.utc(reading.created_at).toISOString()
})
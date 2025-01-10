import {Sensor} from "../../types/domain/public";
import {Prisma} from '@prisma/client';
import {fromBinaryUuid} from "../../utils/uuid";
import dayjs from "dayjs";
import {makeReadingPublic} from "./makeReadingPublic";

type SensorEntity = Prisma.sensorsGetPayload<{
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
}>;

export const makeSensorPublic = (sensor: SensorEntity): Sensor => {
    const lastReading = sensor.readings.length > 0 ? sensor.readings[0] : null;
    return {
        id: fromBinaryUuid(sensor.id),
        coordinates: {
            lat: sensor.lat,
            lng: sensor.lng
        },
        address: {
            street: sensor.street,
            city: sensor.city
        },
        active: Boolean(lastReading && dayjs.utc().subtract(3, 'h').isBefore(lastReading.created_at)),
        last_reading: lastReading ? makeReadingPublic(lastReading) : null,
    }
}
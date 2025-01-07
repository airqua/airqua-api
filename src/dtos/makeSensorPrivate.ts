import {Prisma, users} from '@prisma/client';
import {Sensor, SensorNotOwn, SensorOwn} from "../types/domain/private";
import {fromBinaryUuid} from "../utils/uuid";
import dayjs from "dayjs";
import {makeReadingPrivate} from "./makeReadingPrivate";

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

export const makeSensorPrivate = (sensor: SensorEntity, user: users | null): Sensor => {
    const lastReading = sensor.readings.length > 0 ? sensor.readings[0] : null;
    return user && fromBinaryUuid(sensor.created_by) === fromBinaryUuid(user.id) ? ({
        own: true,
        id: fromBinaryUuid(sensor.id),
        coordinates: {
            lat: sensor.lat,
            lng: sensor.lng,
        },
        address: {
            street: sensor.street,
            city: sensor.city
        },
        active: Boolean(lastReading && dayjs.utc().subtract(3, 'h').isBefore(lastReading.created_at)),
        last_reading: lastReading ? makeReadingPrivate(lastReading) : null,
        visible: sensor.visible,
        approved: sensor.approved
    } satisfies SensorOwn) : ({
        own: false,
        id: fromBinaryUuid(sensor.id),
        coordinates: {
            lat: sensor.lat,
            lng: sensor.lng,
        },
        address: {
            street: sensor.street,
            city: sensor.city
        },
        active: Boolean(lastReading && dayjs.utc().subtract(3, 'h').isBefore(lastReading.created_at)),
        last_reading: lastReading ? makeReadingPrivate(lastReading) : null,
    } satisfies SensorNotOwn)
}
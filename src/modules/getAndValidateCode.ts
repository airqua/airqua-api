import {db} from "../db";
import dayjs from "dayjs";

export const getAndValidateCode = async (code: string) => {
    const codeEntity = await db.codes.findFirst({ where: { id: code } });

    if(!codeEntity) {
        return null;
    }
    if(dayjs.utc().isAfter(dayjs.utc(codeEntity.valid_until))) {
        await db.codes.delete({ where: { id: codeEntity.id } });
        return null;
    }

    return codeEntity;
}
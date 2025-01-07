import {env} from "../env";

export const makeVerificationLink = (id: string) => `${env.BASE_URL}/verify/${id}`;
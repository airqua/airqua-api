import {env} from "../env";

export const makeRecoveryLink = (id: string) => `${env.BASE_URL}/recover/${id}`;
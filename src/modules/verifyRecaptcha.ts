import {env} from "../env";

export const verifyRecaptcha = async (response: string) => {
    const r = await fetch(
        `${env.RECAPTCHA_URL}?secret=${env.RECAPTCHA_SECRET}&response=${response}`,
        {}
    );
    return r.json().then((r) => r.success as boolean);
}
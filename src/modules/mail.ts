import sendgrid from "@sendgrid/mail";
import fs from 'node:fs/promises';
import path from "node:path";
import {EMAIL_FROM} from "../constants/constants";
import {env} from "../env";

sendgrid.setApiKey(env.SENDGRID_API_KEY);

export const sendVerifyEmail = async (email: string, firstName: string, verifyLink: string) => {
    const verifyHtml = await fs.readFile(
        path.join(env.EMAILS_BASE_PATH, "verify.html"), { encoding: "utf8" }
    );
    const verifyText = await fs.readFile(
        path.join(env.EMAILS_BASE_PATH, "verify.txt"), { encoding: "utf8" }
    );

    return sendgrid.send({
        from: EMAIL_FROM,
        to: email,
        subject: 'AirQua - Verify Email',
        html: verifyHtml
            .replace(/\[FIRST_NAME]/g, firstName)
            .replace(/\[VERIFY_LINK]/g, verifyLink),
        text: verifyText
            .replace(/\[FIRST_NAME]/g, firstName)
            .replace(/\[VERIFY_LINK]/g, verifyLink),
    });
}

export const sendRecoverEmail = async (email: string, firstName: string, recoveryLink: string) => {
    const recoverHtml = await fs.readFile(
        path.join(env.EMAILS_BASE_PATH, "recover.html"), { encoding: "utf8" }
    );
    const recoverText = await fs.readFile(
        path.join(env.EMAILS_BASE_PATH, "recover.txt"), { encoding: "utf8" }
    );

    return sendgrid.send({
        from: EMAIL_FROM,
        to: email,
        subject: 'AirQua - Recover your account',
        html: recoverHtml
            .replace(/\[FIRST_NAME]/g, firstName)
            .replace(/\[RECOVERY_LINK]/g, recoveryLink),
        text: recoverText
            .replace(/\[FIRST_NAME]/g, firstName)
            .replace(/\[RECOVERY_LINK]/g, recoveryLink),
    });
}

export const sendAlreadyRegisteredEmail = async (email: string, firstName: string) => {
    const alreadyHtml = await fs.readFile(
        path.join(env.EMAILS_BASE_PATH, "already.html"), { encoding: "utf8" }
    );
    const alreadyText = await fs.readFile(
        path.join(env.EMAILS_BASE_PATH, "already.txt"), { encoding: "utf8" }
    );

    return sendgrid.send({
        from: EMAIL_FROM,
        to: email,
        subject: 'AirQua - Recover your account',
        html: alreadyHtml
            .replace(/\[FIRST_NAME]/g, firstName),
        text: alreadyText
            .replace(/\[FIRST_NAME]/g, firstName),
    });
}
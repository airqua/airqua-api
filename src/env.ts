import {ArrayElement} from "./types/ArrayElement";

const ENVS = [
    "VERSION",
    "PORT",
    "BASE_URL",
    "COOKIE_SECRET",
    "TOKEN_VALID_DAYS",
    "SENDGRID_API_KEY",
    "EMAILS_BASE_PATH",
    "RECAPTCHA_URL",
    "RECAPTCHA_SECRET"
] as const;

export const env = process.env as Record<ArrayElement<typeof ENVS>, string>;
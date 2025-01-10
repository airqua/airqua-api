import './db';
import dayjs from 'dayjs';
import dayjsUTC from 'dayjs/plugin/utc';
import fastify from "fastify";
import fastifyCookie, {FastifyCookieOptions} from "@fastify/cookie";
import {env} from "./env";
import {privateHandler} from "./api/private";
import {publicHandler} from "./api/public";

dayjs.extend(dayjsUTC);

const f = fastify({ logger: true });

f.register(fastifyCookie, {
    secret: env.COOKIE_SECRET,
    parseOptions: {
        path: '/',
        httpOnly: true,
        secure: true,
    }
} as FastifyCookieOptions);

f.register(publicHandler, { prefix: '/public' });
f.register(privateHandler, { prefix: '/private' });

void f.listen({
    port: Number(env.PORT),
    host: '0.0.0.0'
});

process.once('SIGINT', () => f.close());
process.once('SIGTERM', () => f.close());
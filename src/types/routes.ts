import { FastifyInstance } from 'fastify';

export type Fastify = FastifyInstance;
export type Routes = (fastify: FastifyInstance, _: unknown, done: (err?: Error) => void) => void;
export type Route = (fastify: FastifyInstance) => void;
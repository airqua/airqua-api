import { Routes, Fastify } from "../types/routes";

type RoutesPure = (fastify: Fastify) => void;

export const makeRoutes = (routes: RoutesPure): Routes =>
    (fastify, _, done) => {
        routes(fastify);
        done();
    };
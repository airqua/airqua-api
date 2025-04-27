/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GenericOk {
  status: "Ok";
}

export interface GenericBadRequest {
  status: "Error";
  error: "Bad Request";
}

export interface GenericUnauthorized {
  status: "Error";
  error: "Authorization failed";
}

export interface GenericForbidden {
  status: "Error";
  error: "Forbidden";
}

export interface GenericNotFound {
  status: "Error";
  error: "Not found";
}

export interface GenericInternalError {
  status: "Error";
  error: "Something went terribly wrong, contact hi@airqua.uk";
}

export interface User {
  /** @format uuid */
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  /** @format date-time */
  created_at: string;
  verified: boolean;
  admin: boolean;
}

export interface LoginPost {
  /** @format email */
  email: string;
  password: string;
}

export interface SignupPost {
  first_name: string;
  last_name: string;
  /** @format email */
  email: string;
  password: string;
  recaptcha: string;
}

export interface RecoverPost {
  /** @format email */
  email: string;
  recaptcha: string;
}

export interface RecoverCodePost {
  password: string;
}

export interface AccountPatch {
  old_password: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

export interface Session {
  id: string;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  valid_until: string;
}

export interface Token {
  token: string;
}

export interface Coordinates {
  /** @example 51.45641 */
  lat: number;
  /** @example -2.594192 */
  lng: number;
}

export interface Address {
  /** @example "1 Main Street" */
  street: string;
  /** @example "Bristol" */
  city: string;
}

export interface SensorGeneric {
  /** @format uuid */
  id: string;
  coordinates: Coordinates;
  address: Address;
  /** The sensor has transmitted data in at least one of the last three polling cycles */
  active: boolean;
  last_reading: SensorReading | null;
}

export type SensorNotOwn = {
  own: false;
} & SensorGeneric;

export type SensorOwn = {
  own: true;
} & SensorGeneric & {
    visible: boolean;
    approved: boolean;
  };

export type Sensor = SensorNotOwn | SensorOwn;

export interface SensorPost {
  coordinates: Coordinates;
  address: Address;
}

export interface SensorPatch {
  coordinates?: Coordinates;
  address?: Address;
}

export interface SensorVisiblePut {
  visible: boolean;
}

export interface SensorApprovePut {
  approved: boolean;
}

export interface SensorReading {
  /** @format uuid */
  id: string;
  values: SensorReadingValue[];
  /** @format date-time */
  created_at: string;
}

export interface SensorReadingValue {
  /** @format uuid */
  id: string;
  metric: Metric;
  /** @example 5 */
  value: number;
}

export interface SensorReadingPost {
  /**
   * Should be one of the metrics ids provided by GET /metrics
   * @example "co2"
   */
  metric_id: string;
  /** @example 20 */
  value: number;
}

export interface Metric {
  /** @example "co2" */
  id: string;
  /** @example "Carbon dioxide" */
  name: string;
  /** @example "It is one of three main greenhouse gases in the atmosphere of Earth" */
  description: string;
  /** @example 10 */
  max: number;
  /** @example "ppm" */
  unit: string;
}

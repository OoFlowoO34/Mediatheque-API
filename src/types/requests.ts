import { Request } from 'express';

export interface IdParam {
  id: string;
}

// For requests that include an ID parameter and a body
export type RequestIdAndBody<T> = Request<IdParam, {}, T>;

// For requests that include an ID parameter
export type RequestId = Request<IdParam>;

// For requests that include a body
export type RequestBody<T> = Request<{}, {}, T>;
import { Request, Response, NextFunction } from 'express';

interface IResponseResult<T = any> {
  message: string;
  statusCode: number;
  error?: string;
  data?: T;
  validator?: any;
}

type Send<T = Response, A = any> = (body?: IResponseResult<A>) => T;

export interface INextFunction extends NextFunction {}

export interface IRequest<B = any> extends Request {
  body: B;
}

export interface IResponse<T = any> extends Response {
  json: Send<this, T>;
}

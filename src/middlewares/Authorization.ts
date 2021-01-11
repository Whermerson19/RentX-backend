import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";

import authConfig from "../config/auth";

interface IPayload {
  sub: string;
  admin: boolean;
}

export default class Authorization {

  public commonAuthorization(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    const authHeaders = request.headers.authorization;

    if (!authHeaders) throw new Error("JWT Token is missing");

    const [, token] = authHeaders.split(" ");

    const verifyToken = verify(token, authConfig.jwt.secret);
    if (!verifyToken) throw new Error("Invalid token");

    const { sub, admin } = verifyToken as IPayload;

    request.user = {
      id: sub,
    };

    return next();
  }
  
  public adminAuthorization(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    const authHeaders = request.headers.authorization;

    if (!authHeaders) throw new Error("JWT Token is missing");

    const [, token] = authHeaders.split(" ");

    const verifyToken = verify(token, authConfig.jwt.secret);
    if (!verifyToken) throw new Error("Invalid token");

    const { sub, admin } = verifyToken as IPayload;

    if (!admin) throw new Error("Only admins can use it");

    request.user = {
      id: sub,
    };

    return next();
  }

  public clientAuthorization(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    const authHeaders = request.headers.authorization;

    if (!authHeaders) throw new Error("JWT Token is missing");

    const [, token] = authHeaders.split(" ");

    const verifyToken = verify(token, authConfig.jwt.secret);
    if (!verifyToken) throw new Error("Invalid token");

    const { sub, admin } = verifyToken as IPayload;

    if (admin) throw new Error("Only clients can use it");

    request.user = {
      id: sub,
    };

    return next();
  }
}
